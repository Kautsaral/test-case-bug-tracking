import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { supabase } from "../lib/supabase";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function DetailField({ label, children, className = "" }) {
  return (
    <div className={className}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-800">
        {children}
      </dd>
    </div>
  );
}

function AdminTestCaseDetailPage() {
  const { id } = useParams();
  const [testCase, setTestCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const fetchTestCase = useCallback(async () => {
    setTestCase(null);
    setNotFound(false);
    setLoadError("");

    if (!uuidPattern.test(id ?? "")) {
      setLoading(false);
      setLoadError("ID Test Case tidak valid.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("test_cases")
        .select(`
          id, tc_code, title, module_id, priority, description,
          pre_conditions, steps, expected_result, is_published,
          created_at, updated_at, modules(name)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setNotFound(true);
        return;
      }

      setTestCase(data);
    } catch (error) {
      console.error("Failed to load Test Case detail:", error);
      setLoadError("Gagal memuat detail Test Case. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const initializeDetail = async () => {
      await fetchTestCase();
    };

    initializeDetail();
  }, [fetchTestCase]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to="/admin/test-cases"
        className="inline-flex items-center text-sm font-semibold text-[#034694] hover:underline"
      >
        ← Back to Test Cases
      </Link>

      {loading ? (
        <section className="flex min-h-64 items-center justify-center rounded-xl border border-[#D1D3D4] bg-white">
          <p className="text-sm text-slate-500">Loading Test Case...</p>
        </section>
      ) : loadError ? (
        <section className="rounded-xl border border-[#EE242C]/20 bg-white p-5 sm:p-6">
          <p role="alert" className="text-sm text-[#EE242C]">{loadError}</p>
          {uuidPattern.test(id ?? "") && (
            <button
              type="button"
              onClick={fetchTestCase}
              className="mt-3 text-sm font-semibold text-[#034694] hover:underline"
            >
              Try again
            </button>
          )}
        </section>
      ) : notFound ? (
        <section className="rounded-xl border border-[#D1D3D4] bg-white px-5 py-12 text-center">
          <h1 className="text-lg font-semibold text-slate-900">Test Case not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The requested Test Case does not exist or is no longer available.
          </p>
        </section>
      ) : testCase ? (
        <>
          <section className="rounded-xl border border-[#D1D3D4] bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#6A7AB5]">{testCase.tc_code}</p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  {testCase.title}
                </h1>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                  testCase.is_published
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {testCase.is_published ? "Published" : "Unpublished"}
              </span>
            </div>

            <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <DetailField label="Module">
                {testCase.modules?.name ?? "Module unavailable"}
              </DetailField>
              <DetailField label="Priority">
                <span className="inline-flex rounded-full bg-[#DBA111]/10 px-2.5 py-1 text-xs font-semibold text-[#8A6500]">
                  {testCase.priority}
                </span>
              </DetailField>
              <DetailField label="Created Date">
                {formatDate(testCase.created_at)}
              </DetailField>
              <DetailField label="Updated Date">
                {formatDate(testCase.updated_at)}
              </DetailField>
            </dl>
          </section>

          <section className="rounded-xl border border-[#D1D3D4] bg-white p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-slate-900">Test Scenario</h2>
            <dl className="mt-6 space-y-6">
              <DetailField label="Description">
                {testCase.description?.trim() || "No description provided."}
              </DetailField>
              <DetailField label="Pre-conditions">
                {testCase.pre_conditions?.trim() || "No pre-conditions provided."}
              </DetailField>
              <DetailField label="Steps">
                {testCase.steps}
              </DetailField>
              <DetailField label="Expected Result">
                {testCase.expected_result}
              </DetailField>
            </dl>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default AdminTestCaseDetailPage;
