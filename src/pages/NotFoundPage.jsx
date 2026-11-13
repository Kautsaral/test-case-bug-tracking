import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-6">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>

      <p className="mt-4 text-slate-500">Page not found.</p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
