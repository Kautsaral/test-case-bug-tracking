import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const emptyForm = { name: "", description: "" };

function getMutationErrorMessage(error, action) {
  if (error?.code === "23505") {
    return "Nama modul tersebut sudah digunakan. Nama modul harus unik tanpa membedakan huruf kapital.";
  }

  if (error?.code === "23503" && action === "menghapus") {
    return "Modul ini masih digunakan oleh satu atau beberapa Test Case sehingga tidak dapat dihapus.";
  }

  console.error(`Failed to ${action} module:`, error);
  return `Gagal ${action} modul. Silakan coba kembali.`;
}

function AdminModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingModule, setEditingModule] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mutatingId, setMutatingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchModules = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const { data, error } = await supabase
        .from("modules")
        .select("id, name, description, is_published, created_at, updated_at")
        .order("name", { ascending: true });

      if (error) throw error;
      setModules(data ?? []);
    } catch (error) {
      console.error("Failed to load modules:", error);
      setLoadError("Gagal memuat daftar modul. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeModules = async () => {
      await fetchModules();
    };

    initializeModules();
  }, [fetchModules]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingModule(null);
    setFormError("");
  };

  const handleEdit = (module) => {
    setEditingModule(module);
    setForm({ name: module.name, description: module.description ?? "" });
    setFormError("");
    setActionError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setActionError("");

    const name = form.name.trim();
    if (!name) {
      setFormError("Nama modul wajib diisi.");
      return;
    }

    setSaving(true);
    try {
      const values = {
        name,
        description: form.description.trim() || null,
        updated_at: new Date().toISOString(),
      };
      const result = editingModule
        ? await supabase.from("modules").update(values).eq("id", editingModule.id)
        : await supabase.from("modules").insert({ ...values, is_published: false });

      if (result.error) throw result.error;

      resetForm();
      await fetchModules();
    } catch (error) {
      setFormError(getMutationErrorMessage(error, editingModule ? "memperbarui" : "membuat"));
    } finally {
      setSaving(false);
    }
  };

  const handlePublishToggle = async (module) => {
    setMutatingId(module.id);
    setActionError("");

    try {
      const { error } = await supabase
        .from("modules")
        .update({
          is_published: !module.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", module.id);

      if (error) throw error;
      await fetchModules();
    } catch (error) {
      setActionError(getMutationErrorMessage(error, "mengubah status publikasi"));
    } finally {
      setMutatingId(null);
    }
  };

  const handleDelete = async (module) => {
    const confirmed = window.confirm(
      `Hapus modul “${module.name}”? Tindakan ini tidak dapat dibatalkan.`,
    );
    if (!confirmed) return;

    setMutatingId(module.id);
    setActionError("");
    try {
      const { error } = await supabase.from("modules").delete().eq("id", module.id);
      if (error) throw error;
      await fetchModules();
    } catch (error) {
      setActionError(getMutationErrorMessage(error, "menghapus"));
    } finally {
      setMutatingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <p className="text-sm font-semibold text-[#6A7AB5]">Workspace Setup</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Modules</h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage application modules used to organize Test Cases.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchModules}
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
            {editingModule ? "Edit Module" : "Create Module"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            New modules are unpublished until you publish them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Module name <span className="text-[#EE242C]">*</span>
              <input
                type="text"
                required
                maxLength={255}
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="mt-2 w-full rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="e.g. User Authentication"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Description <span className="font-normal text-slate-400">(optional)</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="mt-2 w-full resize-y rounded-lg border border-[#D1D3D4] px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/15"
                placeholder="Briefly describe this module"
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
              disabled={saving}
              className="rounded-lg bg-[#034694] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#023875] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : editingModule ? "Save Changes" : "Create Module"}
            </button>
            {editingModule && (
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

      {actionError && (
        <div role="alert" className="rounded-lg border border-[#EE242C]/20 bg-[#EE242C]/5 p-4 text-sm text-[#EE242C]">
          {actionError}
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-[#D1D3D4] bg-white">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h3 className="font-semibold text-slate-900">All Modules</h3>
          <p className="mt-1 text-xs text-slate-500">{modules.length} module{modules.length === 1 ? "" : "s"}</p>
        </div>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center px-5">
            <p className="text-sm text-slate-500">Loading modules...</p>
          </div>
        ) : loadError ? (
          <div className="p-5 sm:p-6">
            <p role="alert" className="text-sm text-[#EE242C]">{loadError}</p>
            <button type="button" onClick={fetchModules} className="mt-3 text-sm font-semibold text-[#034694] hover:underline">
              Try again
            </button>
          </div>
        ) : modules.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            No modules yet. Create a module to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 sm:px-6">Module</th>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3">Created</th>
                  <th scope="col" className="px-5 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modules.map((module) => (
                  <tr key={module.id}>
                    <td className="max-w-md px-5 py-4 sm:px-6">
                      <p className="font-semibold text-slate-900">{module.name}</p>
                      <p className="mt-1 whitespace-pre-wrap text-xs text-slate-500">
                        {module.description || "No description"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${module.is_published ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                        {module.is_published ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                      {new Date(module.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(module)}
                          disabled={mutatingId === module.id}
                          className="rounded-md border border-[#D1D3D4] px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePublishToggle(module)}
                          disabled={mutatingId === module.id}
                          className="rounded-md border border-[#034694]/20 px-2.5 py-1.5 text-xs font-semibold text-[#034694] hover:bg-[#034694]/5 disabled:opacity-50"
                        >
                          {mutatingId === module.id ? "Saving..." : module.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(module)}
                          disabled={mutatingId === module.id}
                          className="rounded-md border border-[#EE242C]/20 px-2.5 py-1.5 text-xs font-semibold text-[#EE242C] hover:bg-[#EE242C]/5 disabled:opacity-50"
                        >
                          Delete
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

export default AdminModulesPage;
