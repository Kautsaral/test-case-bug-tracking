import PublicLayout from "../layouts/PublicLayout";

function HomePage() {
  return (
    <PublicLayout>
      {/* Overview */}
      <section className="py-10 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#034694]">
            QA Management Workspace
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Test Case & Bug Tracking
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            A centralized workspace to organize test cases, track test
            executions, and monitor software defects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#test-cases"
              className="rounded-lg bg-[#034694] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#023574]"
            >
              Explore Test Cases
            </a>

            <a
              href="#bugs"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              View Bug Reports
            </a>
          </div>
        </div>
      </section>

      {/* Public Content Sections */}
      <section className="grid gap-5 pb-12 md:grid-cols-2">
        <div
          id="test-cases"
          className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900">Test Cases</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Browse published test cases and review their testing scenarios.
          </p>
        </div>

        <div
          id="bugs"
          className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900">Bug Reports</h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Explore published bug reports and review recorded defects.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

export default HomePage;
