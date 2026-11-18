import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/useAuth";

function AdminDashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setErrorMessage("");

    try {
      await signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setErrorMessage("Gagal logout. Silakan coba kembali.");
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-500">Welcome to the Admin Panel.</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-800">Admin Information</h2>

          <p className="mt-3 text-sm text-slate-600">
            Name: {profile?.full_name}
          </p>

          <p className="mt-1 text-sm text-slate-600">Email: {user?.email}</p>
        </div>

        {errorMessage && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
