import { Link, NavLink } from "react-router-dom";

function PublicLayout({ children }) {
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-[#034694]" : "text-slate-600 hover:text-[#034694]"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7FB] text-slate-800">
      {/* Public Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#034694] text-sm font-bold text-white">
              QA
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                Test Case & Bug Tracking
              </p>
              <p className="text-[11px] text-slate-500">
                QA Management Workspace
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Overview
            </NavLink>

            <a
              href="/#test-cases"
              className={navLinkClass({ isActive: false })}
            >
              Test Cases
            </a>

            <a href="/#bugs" className={navLinkClass({ isActive: false })}>
              Bug Reports
            </a>
          </nav>

          {/* Admin Access */}
          <Link
            to="/admin/login"
            className="rounded-lg bg-[#034694] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#023574]"
          >
            Admin Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Test Case & Bug Tracking Web App</p>

          <p>QA Management Portfolio Project</p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
