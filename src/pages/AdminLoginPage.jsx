import { Link } from "react-router-dom";

function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>

        <p className="mt-2 text-slate-500">
          Admin authentication will be implemented in the next stage.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default AdminLoginPage;
