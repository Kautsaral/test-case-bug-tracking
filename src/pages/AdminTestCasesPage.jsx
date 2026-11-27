import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../context/useAuth";
import { supabase } from "../lib/supabase";

const priorities = ["Low", "Medium", "High", "Critical"];

const emptyForm = {
  title: "",
  module_id: "",
  priority: "",
  description: "",
  pre_conditions: "",
  steps: "",
  expected_result: "",
};

function getDatabaseErrorMessage(error, action) {
  if (error?.code === "23505") {
    return "Kode Test Case duplikat terdeteksi. Silakan coba kembali.";
  }

  if (error?.code === "23503") {
    return "Module atau pengguna tidak valid. Muat ulang data dan coba kembali.";
  }

  if (error?.code === "23514") {
    return "Priority tidak sesuai dengan nilai yang diizinkan.";
  }

  if (error?.code === "42501") {
    return "Akses ditolak oleh kebijakan database. Pastikan sesi Admin masih aktif.";
  }

  console.error(`Failed to ${action} test case:`, error);
  return `Gagal ${action} Test Case. Silakan coba kembali.`;
}

function AdminTestCasesPage() {
  const { user } = useAuth();
  const [testCases, setTestCases] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchPageData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [testCasesResult, modulesResult] = await Promise.all([
        supabase
          .from("test_cases")
          .select(
            "id, tc_code, title, module_id, priority, description, pre_conditions, steps, expected_result, created_at, modules(name)",
          )
          .order("created_at", { ascending: false }),
        supabase.from("modules").select("id, name").order("name", { ascending: true }),
      ]);

      if (testCasesResult.error || modulesResult.error) {
        const failedQueries = [];
        if (testCasesResult.error) failedQueries.push("Test Cases");
        if (modulesResult.error) failedQueries.push("Modules");

        const queryError = testCasesResult.error ?? modulesResult.error;
        console.error(`Failed to load ${failedQueries.join(" and ")}:`, queryError);
        setLoadError(
          `Gagal memuat ${failedQueries.join(" dan ")}. Silakan coba kembali.`,
        );
        return false;
      }

      setTestCases(testCasesResult.data ?? []);
      setModules(modulesResult.data ?? []);
      return true;
    } catch (error) {
      console.error("Unexpected error while loading Test Case page data:", error);
      setLoadError("Terjadi kesalahan saat memuat data Test Case dan Module. Silakan coba kembali.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializePage = async () => {
      await fetchPageData();
    };

    initializePage();
  }, [fetchPageData]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingTestCase(null);
    setFormError("");
  };

  const handleEdit = (testCase) => {
    setEditingTestCase(testCase);
    setForm({
      title: testCase.title ?? "",
      module_id: testCase.module_id ?? "",
      priority: testCase.priority ?? "",
      description: testCase.description ?? "",
      pre_conditions: testCase.pre_conditions ?? "",
      steps: testCase.steps ?? "",
      expected_result: testCase.expected_result ?? "",
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const values = {
      title: form.title.trim(),
      module_id: form.module_id,
      priority: form.priority,
      description: form.description.trim() || null,
      pre_conditions: form.pre_conditions.trim() || null,
      steps: form.steps.trim(),
      expected_result: form.expected_result.trim(),
    };

    if (!values.title || !values.module_id || !values.priority || !values.steps || !values.expected_result) {
      setFormError("Title, Module, Priority, Steps, dan Expected Result wajib diisi.");
      return;
    }

    if (!priorities.includes(values.priority)) {
      setFormError("Pilih Priority yang tersedia.");
      return;
    }

    if (!editingTestCase && !user?.id) {
      setFormError("Sesi Admin tidak tersedia. Silakan login kembali.");
      return;
    }

    setSaving(true);
    try {
      const result = editingTestCase
        ? await supabase
            .from("test_cases")
            .update(values)
            .eq("id", editingTestCase.id)
        : await supabase
            .from("test_cases")
            .insert({ ...values, user_id: user.id });

      if (result.error) throw result.error;

      resetForm();
      const refreshed = await fetchPageData();
      if (!refreshed) {
        setLoadError("Test Case berhasil disimpan, tetapi daftar gagal diperbarui. Silakan coba lagi.");
      }
    } catch (error) {
      setFormError(
        getDatabaseErrorMessage(error, editingTestCase ? "memperbarui" : "membuat"),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <p className="text-sm font-semibold text-[#6A7AB5]">Test Management</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Test Cases</h2>
            <p className="mt-2 text-sm text-slate-500">
              Create and maintain test scenarios for each application module.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchPageData}
            disabled={loading}
            className="rounded-lg border border-[#D1D3D4] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Refresh Data
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-[#D1D3D4] bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">
            {editingTestCase ? "Edit Test Case" : "Create Test Case"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Test Case code is generated automatically when the record is created.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Title <span className="text-[#EE242C]">*</span>
              <input
                type="text"
                required
                maxLength={255}
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="mt-2 w-full rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="e.g. Sign in with valid credentials"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Module <span className="text-[#EE242C]">*</span>
              <select
                required
                value={form.module_id}
                onChange={(event) => setForm({ ...form, module_id: event.target.value })}
                className="mt-2 w-full rounded-lg border border-[#D1D3D4] bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
              >
                <option value="">Select a module</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>{module.name}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Priority <span className="text-[#EE242C]">*</span>
              <select
                required
                value={form.priority}
                onChange={(event) => setForm({ ...form, priority: event.target.value })}
                className="mt-2 w-full rounded-lg border border-[#D1D3D4] bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
              >
                <option value="">Select a priority</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Description <span className="font-normal text-slate-400">(optional)</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="mt-2 w-full resize-y rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="Describe the test scenario"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Pre-conditions <span className="font-normal text-slate-400">(optional)</span>
              <textarea
                rows={2}
                value={form.pre_conditions}
                onChange={(event) => setForm({ ...form, pre_conditions: event.target.value })}
                className="mt-2 w-full resize-y rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="Conditions required before testing"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Steps <span className="text-[#EE242C]">*</span>
              <textarea
                rows={5}
                required
                value={form.steps}
                onChange={(event) => setForm({ ...form, steps: event.target.value })}
                className="mt-2 w-full resize-y rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="Enter each test step"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Expected Result <span className="text-[#EE242C]">*</span>
              <textarea
                rows={3}
                required
                value={form.expected_result}
                onChange={(event) => setForm({ ...form, expected_result: event.target.value })}
                className="mt-2 w-full resize-y rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="Describe the expected outcome"
              />
            </label>
          </div>

          {formError && (
            <p role="alert" className="rounded-lg border border-[#EE242C]/20 bg-[#EE242C]/5 p-3 text-sm text-[#EE242C]">
              {formError}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={saving || loading || modules.length === 0}
              className="rounded-lg bg-[#034694] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#023875] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : editingTestCase ? "Save Changes" : "Create Test Case"}
            </button>
            {editingTestCase && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border border-[#D1D3D4] bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#D1D3D4] bg-white">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h3 className="font-semibold text-slate-900">All Test Cases</h3>
          <p className="mt-1 text-xs text-slate-500">
            {testCases.length} Test Case{testCases.length === 1 ? "" : "s"}
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center px-5">
            <p className="text-sm text-slate-500">Loading Test Cases...</p>
          </div>
        ) : loadError ? (
          <div className="p-5 sm:p-6">
            <p role="alert" className="text-sm text-[#EE242C]">{loadError}</p>
            <button
              type="button"
              onClick={fetchPageData}
              className="mt-3 text-sm font-semibold text-[#034694] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : testCases.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            No Test Cases yet. Create a Test Case to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 sm:px-6">Test Case</th>
                  <th scope="col" className="px-5 py-3">Module</th>
                  <th scope="col" className="px-5 py-3">Priority</th>
                  <th scope="col" className="px-5 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testCases.map((testCase) => (
                  <tr key={testCase.id}>
                    <td className="max-w-md px-5 py-4 sm:px-6">
                      <p className="font-semibold text-slate-900">{testCase.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{testCase.tc_code}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {testCase.modules?.name ?? "Module unavailable"}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#DBA111]/10 px-2.5 py-1 text-xs font-semibold text-[#8A6500]">
                        {testCase.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleEdit(testCase)}
                          disabled={saving}
                          className="rounded-md border border-[#D1D3D4] px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminTestCasesPage;
