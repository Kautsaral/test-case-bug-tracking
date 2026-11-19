import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const initialStats = {
  modules: 0,
  testCases: 0,
  executions: {
    total: 0,
    Passed: 0,
    Failed: 0,
    Blocked: 0,
  },
  bugs: {
    total: 0,
    Open: 0,
    "In Progress": 0,
    "Ready for Retest": 0,
    Closed: 0,
  },
  releases: {
    total: 0,
    Draft: 0,
    "In Testing": 0,
    Completed: 0,
  },
};

const executionStatuses = [
  { label: "Passed", color: "#16A34A" },
  { label: "Failed", color: "#EE242C" },
  { label: "Blocked", color: "#DBA111" },
];

const bugStatuses = [
  { label: "Open", color: "#034694" },
  { label: "In Progress", color: "#6A7AB5" },
  { label: "Ready for Retest", color: "#DBA111" },
  { label: "Closed", color: "#16A34A" },
];

const releaseStatuses = [
  { label: "Draft", color: "#D1D3D4" },
  { label: "In Testing", color: "#6A7AB5" },
  { label: "Completed", color: "#16A34A" },
];

function SummaryCard({ label, value, description }) {
  return (
    <div className="rounded-xl border border-[#D1D3D4] bg-white p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function StatusRow({ label, value, total, color }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-slate-600">{label}</span>
        </div>
        <span className="text-sm font-semibold tabular-nums text-slate-800">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

function StatusPanel({ title, total, statuses }) {
  return (
    <section className="rounded-xl border border-[#D1D3D4] bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="rounded-md bg-[#034694]/10 px-2.5 py-1 text-xs font-semibold text-[#034694]">
          {total} Total
        </span>
      </div>

      <div className="space-y-5">
        {statuses.map((status) => (
          <StatusRow
            key={status.label}
            label={status.label}
            value={status.value}
            total={total}
            color={status.color}
          />
        ))}
      </div>

      {total === 0 && (
        <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
          No records available yet.
        </p>
      )}
    </section>
  );
}

function RecentRecords({ title, records, codeField }) {
  return (
    <section className="rounded-xl border border-[#D1D3D4] bg-white p-5">
      <h3 className="mb-4 font-semibold text-slate-900">{title}</h3>

      {records.length === 0 ? (
        <p className="py-5 text-sm text-slate-400">No records available yet.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  {record.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {record[codeField]}
                </p>
              </div>
              <p className="shrink-0 text-xs text-slate-400">
                {new Date(record.created_at).toLocaleDateString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AdminDashboardPage() {
  const [stats, setStats] = useState(initialStats);
  const [recentRecords, setRecentRecords] = useState({
    testCases: [],
    bugs: [],
    releases: [],
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const [
        modulesResult,
        testCasesResult,
        executionsResult,
        bugsResult,
        releasesResult,
        recentTestCasesResult,
        recentBugsResult,
        recentReleasesResult,
      ] = await Promise.all([
        supabase.from("modules").select("*", { count: "exact", head: true }),
        supabase.from("test_cases").select("*", { count: "exact", head: true }),
        supabase.from("test_executions").select("status"),
        supabase.from("bugs").select("status, severity"),
        supabase.from("releases").select("status"),
        supabase
          .from("test_cases")
          .select("id, tc_code, title, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("bugs")
          .select("id, bug_code, title, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("releases")
          .select("id, version, application_name, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      const results = [
        modulesResult,
        testCasesResult,
        executionsResult,
        bugsResult,
        releasesResult,
        recentTestCasesResult,
        recentBugsResult,
        recentReleasesResult,
      ];

      const failedResult = results.find((result) => result.error);

      if (failedResult) {
        throw failedResult.error;
      }

      const nextStats = {
        ...initialStats,
        modules: modulesResult.count ?? 0,
        testCases: testCasesResult.count ?? 0,
        executions: {
          ...initialStats.executions,
          total: executionsResult.data.length,
        },
        bugs: {
          ...initialStats.bugs,
          total: bugsResult.data.length,
        },
        releases: {
          ...initialStats.releases,
          total: releasesResult.data.length,
        },
      };

      executionsResult.data.forEach(({ status }) => {
        if (status in nextStats.executions) {
          nextStats.executions[status] += 1;
        }
      });

      bugsResult.data.forEach(({ status }) => {
        if (status in nextStats.bugs) {
          nextStats.bugs[status] += 1;
        }
      });

      releasesResult.data.forEach(({ status }) => {
        if (status in nextStats.releases) {
          nextStats.releases[status] += 1;
        }
      });

      setStats(nextStats);
      setRecentRecords({
        testCases: recentTestCasesResult.data,
        bugs: recentBugsResult.data,
        releases: recentReleasesResult.data,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      setErrorMessage("Gagal memuat data dashboard. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeDashboard = async () => {
      await fetchDashboardData();
    };

    initializeDashboard();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <p className="text-sm font-semibold text-[#6A7AB5]">
          Workspace Overview
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Overview of your testing activities and project quality.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="rounded-lg border border-[#D1D3D4] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Refresh Data
          </button>
        </div>
      </section>

      {errorMessage && (
        <div className="rounded-lg border border-[#EE242C]/20 bg-[#EE242C]/5 p-4 text-sm text-[#EE242C]">
          <p>{errorMessage}</p>
          <button
            type="button"
            onClick={fetchDashboardData}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Workspace Summary</h3>
          <p className="mt-1 text-xs text-slate-500">
            Current records across your QA workspace.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Modules"
            value={stats.modules}
            description="Registered application modules"
          />
          <SummaryCard
            label="Total Test Cases"
            value={stats.testCases}
            description="Documented test scenarios"
          />
          <SummaryCard
            label="Test Executions"
            value={stats.executions.total}
            description="Recorded execution results"
          />
          <SummaryCard
            label="Bug Reports"
            value={stats.bugs.total}
            description="Recorded software defects"
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Testing Overview</h3>
          <p className="mt-1 text-xs text-slate-500">
            Distribution of test execution results.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <StatusPanel
            title="Test Execution Status"
            total={stats.executions.total}
            statuses={executionStatuses.map((item) => ({
              ...item,
              value: stats.executions[item.label],
            }))}
          />

          <StatusPanel
            title="Bug Report Status"
            total={stats.bugs.total}
            statuses={bugStatuses.map((item) => ({
              ...item,
              value: stats.bugs[item.label],
            }))}
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Release Overview</h3>
          <p className="mt-1 text-xs text-slate-500">
            Current release progress.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <StatusPanel
            title="Release Status"
            total={stats.releases.total}
            statuses={releaseStatuses.map((item) => ({
              ...item,
              value: stats.releases[item.label],
            }))}
          />

          <div className="rounded-xl border border-[#D1D3D4] bg-white p-5">
            <h3 className="font-semibold text-slate-900">Workspace Health</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Your workspace currently has {stats.modules} modules and{" "}
              {stats.testCases} documented test cases. Test execution and defect
              statistics will grow as testing activities are recorded.
            </p>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Total tracked records
              </p>
              <p className="mt-1 text-2xl font-bold text-[#034694]">
                {stats.modules +
                  stats.testCases +
                  stats.executions.total +
                  stats.bugs.total +
                  stats.releases.total}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Recent Records</h3>
          <p className="mt-1 text-xs text-slate-500">
            Latest records added to your workspace.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <RecentRecords
            title="Test Cases"
            records={recentRecords.testCases}
            codeField="tc_code"
          />
          <RecentRecords
            title="Bug Reports"
            records={recentRecords.bugs}
            codeField="bug_code"
          />
          <RecentRecords
            title="Releases"
            records={recentRecords.releases.map((release) => ({
              ...release,
              title: `${release.application_name} v${release.version}`,
            }))}
            codeField="version"
          />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
