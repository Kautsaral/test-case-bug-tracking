import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { loading, profileLoading, profileCheckedUserId, user, isAdmin } =
    useAuth();

  const checkingProfile = user && profileCheckedUserId !== user.id;

  if (loading || profileLoading || checkingProfile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
