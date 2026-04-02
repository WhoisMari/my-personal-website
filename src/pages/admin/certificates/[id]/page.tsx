import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageTitle, Card, FormGrid, Field, Label, Input, Textarea,
  PrimaryBtn, GhostBtn, ErrorMsg, SuccessMsg, ActionRow,
} from "../../../../components/Admin/AdminStyles";
import { useAdminFetch } from "../../../../hooks/useAdminFetch";

interface CertForm {
  title: string;
  description: string;
}

const empty: CertForm = { title: "", description: "" };

export default function AdminCertEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const adminFetch = useAdminFetch();

  const [form, setForm] = useState<CertForm>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    adminFetch(`admin/certificates/${id}/`)
      .then((r) => r.json())
      .then((data) => setForm({ title: data.title, description: data.description }))
      .catch(() => setError("Failed to load certificate"));
  }, [id, isNew, adminFetch]);

  function setField(key: keyof CertForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    if (file) body.append("certificate", file);

    const url = isNew ? "admin/certificates/" : `admin/certificates/${id}/`;
    const method = isNew ? "POST" : "PUT";
    const res = await adminFetch(url, { method, body });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(JSON.stringify(data));
      return;
    }

    if (isNew) {
      const created = await res.json();
      navigate(`/admin/certificates/${created.id}`, { replace: true });
    }
    setSuccess(true);
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>{isNew ? "New certificate" : "Edit certificate"}</PageTitle>
        <GhostBtn onClick={() => navigate("/admin/certificates")}>← Back</GhostBtn>
      </ActionRow>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={setField("title")} required />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={setField("description")} rows={4} />
            </Field>
            <Field>
              <Label>Certificate file {isNew && <span style={{ color: "red" }}>*</span>}</Label>
              <input
                type="file"
                accept="image/*,application/pdf"
                required={isNew}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </Field>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <PrimaryBtn type="submit" disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create certificate" : "Save changes"}
              </PrimaryBtn>
              {error && <ErrorMsg>{error}</ErrorMsg>}
              {success && <SuccessMsg>Saved!</SuccessMsg>}
            </div>
          </FormGrid>
        </form>
      </Card>
    </>
  );
}
