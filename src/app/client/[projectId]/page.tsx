/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { ProjectWithClient } from "@/types";

export default function ClientPage() {
  const params = useParams();
  const projectId = params.projectId as string;

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

        if (!res.ok) {
          throw new Error("Project not found");
        }

        const data: ProjectWithClient = await res.json();
        setProject(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handlePayment = async () => {
    setIsPaymentLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project?.id }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to initiate payment");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "FocusFlow",
        description: `Payment for ${project?.title}`,
        order_id: data.orderId,
        handler: function (response: any) {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
          window.location.reload();
        },
        prefill: {
          name: project?.client.name,
          email: project?.client.email,
        },
        theme: {
          color: "#16a34a",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl">Loading your gallery...</div>
      </main>
    );
  }

  if (error) {
    notFound();
  }

  if (!project || !project.client) {
    notFound();
  }

  const isPaid = project.status === "PAID";

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        {isPaid ? (
          <div className="p-12 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Thank you for your payment!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Your full gallery is now unlocked. We loved working with you,{" "}
              {project.client.name}!
            </p>
            <a
              href={project.deliveryLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Download Your Photos
            </a>
          </div>
        ) : (
          <div className="p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Gallery is Ready!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Hi, {project.client.name}! Here is a sneak peek of your project,
              &#34;
              {project.title}&#34;.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Sneak Peek</h2>
            {project.sampleImageUrls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {project.sampleImageUrls.map((url, index) => (
                  <div
                    key={index}
                    className={`bg-gray-200 rounded-lg shadow-inner overflow-hidden ${
                      index === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`Sample ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover aspect-square"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMDY2vBwAClgE6sD2x5QAAAABJRU5ErkJggg=="
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-8">
                No samples have been added yet.
              </p>
            )}

            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Unlock Your Full Gallery
              </h3>
              <p className="text-lg text-gray-600 mb-2">Total Amount Due:</p>
              <p className="text-5xl font-extrabold text-gray-900 mb-6">
                ₹{project.invoiceAmount}
              </p>
              <button
                onClick={handlePayment}
                disabled={isPaymentLoading}
                className="w-full bg-green-600 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
              >
                {isPaymentLoading ? "Processing..." : "Pay Now to Unlock"}
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Secured by Razorpay
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
