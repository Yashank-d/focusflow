"use client";
import { useState, FormEvent, useEffect } from "react";
import { Client, ProjectWithClient } from "@/types";
import { useRouter } from "next/navigation";

interface EditProjectModalProps {
  project: ProjectWithClient;
}

export default function EditProjectModal({ project }: EditProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [invoiceAmount, setInvoiceAmount] = useState(
    String(project.invoiceAmount)
  );
  const [clientId, setClientId] = useState(project.clientId);
  const [status, setStatus] = useState(project.status);
  const [deliveryLink, setDeliveryLink] = useState(project.deliveryLink || "");
  const [sampleImages, setSampleImages] = useState([
    project.sampleImageUrls[0] || "",
    project.sampleImageUrls[1] || "",
    project.sampleImageUrls[2] || "",
  ]);

  const [clients, setClients] = useState<Client[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSampleImageChange = (index: number, value: string) => {
    const newSamplesImages = [...sampleImages];
    newSamplesImages[index] = value;
    setSampleImages(newSamplesImages);
  };

  useEffect(() => {
    if (isOpen) {
      const fetchClients = async () => {
        try {
          const res = await fetch("/api/clients");
          if (!res.ok) throw new Error("Failed to fetch clients");
          const data: Client[] = await res.json();
          setClients(data);
        } catch (err) {
          if (err instanceof Error) {
            setError("Could not load clients. " + err.message);
          }
        }
      };
      fetchClients();
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          title: title,
          invoiceAmount: parseInt(invoiceAmount, 10) || 0,
          clientId: clientId,
          status: status,
          deliveryLink: deliveryLink,
          sampleImageUrls: sampleImages.filter((url) => url !== ""),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          {/* We'll make the modal taller to fit the new fields */}
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg z-50 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* --- Core Details --- */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="title"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="client"
                  >
                    Assign to Client
                  </label>
                  <select
                    id="client"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a client...
                    </option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="BOOKED">Booked</option>
                    <option value="EDITING">Editing</option>
                    <option value="FINALS_READY">Finals Ready</option>{" "}
                    {/* NEW STATUS */}
                    <option value="PAID">Paid</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="amount"
                  >
                    Invoice Amount (in ₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* --- 3. NEW LINK FIELDS --- */}
              <hr className="my-2" />
              <h3 className="text-lg font-semibold">Delivery Details</h3>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="deliveryLink"
                >
                  Final Google Drive Link
                </label>
                <input
                  type="url"
                  id="deliveryLink"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://drive.google.com/..."
                  value={deliveryLink}
                  onChange={(e) => setDeliveryLink(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bento Grid Sample URLs (up to 3)
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://cloudinary.com/sample1.jpg"
                    value={sampleImages[0]}
                    onChange={(e) => handleSampleImageChange(0, e.target.value)}
                  />
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://cloudinary.com/sample2.jpg"
                    value={sampleImages[1]}
                    onChange={(e) => handleSampleImageChange(1, e.target.value)}
                  />
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://cloudinary.com/sample3.jpg"
                    value={sampleImages[2]}
                    onChange={(e) => handleSampleImageChange(2, e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">Error: {error}</div>
              )}

              {/* --- BUTTONS --- */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
