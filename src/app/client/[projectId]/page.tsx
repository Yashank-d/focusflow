/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { ProjectWithClient } from "@/types";
import { Lock, CheckCircle, Image as ImageIcon, Loader2 } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

export default function ClientPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const router = useRouter();

  const [project, setProject] = useState<ProjectWithClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/public/projects?projectId=${projectId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Project not found");
        const data: ProjectWithClient = await res.json();
        setProject(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handlePayment = async () => {
    setIsPaymentLoading(true);

    try {
      // Step 1: Create Razorpay Order
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project?.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Step 2: Razorpay Checkout Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "FocusFlow Studio",
        description: `Payment for: ${project?.title}`,
        handler: async (response: any) => {
          // Step 3: Verify Payment Signature on Server
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId: project?.id,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.ok) {
            window.location.reload(); // Refresh gallery
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: project?.client.name,
          email: project?.client.email,
        },
        theme: { color: "#4F46E5" },
      };

      const razorpayObj = new (window as any).Razorpay(options);
      razorpayObj.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-brand-bg text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-400 font-light tracking-wide">
            Loading Gallery...
          </p>
        </div>
      </main>
    );
  }

  if (error || !project || !project.client) {
    router.replace("/404");
    return null;
  }

  const isPaid = project.status === "PAID";

  return (
    <main className="min-h-screen w-full bg-brand-bg relative text-gray-100 overflow-x-hidden selection:bg-blue-500/30">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="fixed top-0 left-0 w-full h-[40vh] bg-linear-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-blue-300 tracking-[0.2em] uppercase backdrop-blur-md mb-4">
              {isPaid ? "Gallery Unlocked" : "Gallery Preview"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-500 mb-3">
              {project.title}
            </h1>
            <p className="text-gray-400 font-light text-base">
              Prepared for {project.client.name}
            </p>
          </div>

          {isPaid ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center relative overflow-hidden animate-fade-in max-w-2xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent"></div>
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-serif text-white mb-3">
                Payment Received
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                Thank you! You can now access your full high-resolution gallery.
              </p>
              <a
                href={project.deliveryLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all duration-300"
              >
                <span>Download Full Gallery</span>
              </a>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* LEFT SIDE — SNEAK PEEK IMAGES */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between px-1 mb-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <ImageIcon size={16} />
                    <h3 className="text-sm font-medium">Sneak Peek</h3>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Sample Shots
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Big Top Image */}
                  <div className="col-span-2 aspect-[3/1.7] lg:aspect-[3/1.2] rounded-2xl border border-white/10 overflow-hidden relative">
                    {project.sampleImageUrls[0] ? (
                      <Image
                        src={project.sampleImageUrls[0]}
                        alt="Preview 1"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                  </div>

                  {/* Two Smaller Images */}
                  {[project.sampleImageUrls[1], project.sampleImageUrls[2]].map(
                    (url, i) => (
                      <div
                        key={i}
                        className="aspect-square lg:aspect-4/3 rounded-2xl border border-white/10 overflow-hidden relative"
                      >
                        {url ? (
                          <Image
                            src={url}
                            alt={`Preview ${i + 2}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* RIGHT SIDE — PAYMENT CARD */}
              <div className="lg:col-span-1">
                <div className="h-full bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-2 mb-4 text-blue-300/80">
                      <Lock size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Gallery Locked
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif text-white mb-2">
                      Unlock Access
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Complete the payment to instantly receive the download
                      link for your entire high-resolution collection.
                    </p>
                  </div>

                  <div>
                    <div className="space-y-1 mb-5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                        Total Due
                      </p>
                      <p className="text-4xl font-serif text-white tracking-tight">
                        ₹{project.invoiceAmount.toLocaleString()}
                      </p>
                    </div>

                    <GradientButton
                      onClick={handlePayment}
                      isLoading={isPaymentLoading}
                      className="w-full py-3 text-sm shadow-lg shadow-blue-900/20"
                    >
                      Pay Now to Unlock
                    </GradientButton>

                    <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 opacity-60 hover:opacity-100 transition-opacity">
                      <CheckCircle size={12} />
                      <span className="text-[9px] font-medium uppercase tracking-wider">
                        Secure Payment via Razorpay
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
