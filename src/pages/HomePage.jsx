import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function HomePage() {
  const { user, profile, loading, profileLoading, isAdmin } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800">
          Test Case & Bug Tracking
        </h1>

        <p className="mt-3 text-slate-500">A QA Management Web Application</p>

        <div className="mt-6">
          {loading || profileLoading ? (
            <p className="text-sm text-slate-500">Checking authentication...</p>
          ) : user && isAdmin ? (
            <div className="rounded-lg bg-green-50 p-4">
              <p className="font-semibold text-green-700">Logged in as Admin</p>
              <p className="mt-1 text-sm text-green-600">{profile.full_name}</p>
              <p className="text-sm text-green-600">{user.email}</p>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
