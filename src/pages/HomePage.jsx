import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800">
          Test Case & Bug Tracking
        </h1>

        <p className="mt-3 text-slate-500">A QA Management Web Application</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/admin/login"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
