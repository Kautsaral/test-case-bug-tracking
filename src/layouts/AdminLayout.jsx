import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AdminLayout() {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      label: "Dashboard",
      to: "/admin",
      end: true,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/75 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#034694] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/15 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#034694]">
            QA
          </div>

          <div>
            <p className="text-sm font-bold text-white">Test Case & Bug</p>
            <p className="text-xs text-white/65">Tracking Workspace</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Workspace
          </p>

          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/15 px-6 py-4">
          <p className="text-xs text-white/60">QA Management Workspace</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#D1D3D4] bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <span className="flex w-5 flex-col gap-1">
                <span className="h-0.5 w-full rounded bg-current" />
                <span className="h-0.5 w-full rounded bg-current" />
                <span className="h-0.5 w-full rounded bg-current" />
              </span>
            </button>

            <div>
              <h1 className="text-sm font-semibold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your QA workspace
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">
              {profile?.full_name || "Administrator"}
            </p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </header>

        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
