import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to FocusFlow 📸
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your new all-in-one dashboard for managing your photography clients.
        </p>
        <LoginButton />
      </div>
    </main>
  );
}
