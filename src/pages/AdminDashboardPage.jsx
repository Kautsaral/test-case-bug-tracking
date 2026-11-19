import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AdminDashboardPage() {
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
    <div className="mx-auto max-w-6xl">
      <section className="mb-8">
        <p className="text-sm font-medium text-[#6A7AB5]">Workspace Overview</p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {profile?.full_name || "Admin"}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Manage your test cases, executions, and bug reports.
        </p>
      </section>

      <section className="rounded-xl border border-[#D1D3D4] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Admin Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Account information currently signed in.
            </p>
          </div>

          <span className="rounded-md bg-[#034694]/10 px-3 py-1.5 text-xs font-semibold text-[#034694]">
            Administrator
          </span>
        </div>

        <div className="mt-6 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-500">Full Name</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {profile?.full_name || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Email Address</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {user?.email || "-"}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-5 rounded-lg border border-[#EE242C]/20 bg-[#EE242C]/5 p-3 text-sm text-[#EE242C]">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-lg bg-[#EE242C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#D51D25] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
