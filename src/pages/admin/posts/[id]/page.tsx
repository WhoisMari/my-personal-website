import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageTitle, Card, FormGrid, Field, Label, Input, Textarea,
  PrimaryBtn, GhostBtn, ErrorMsg, SuccessMsg, ActionRow,
} from "../../../../components/Admin/AdminStyles";
import MarkdownEditor from "../../../../components/Admin/MarkdownEditor";
import { useAdminFetch } from "../../../../hooks/useAdminFetch";

interface PostForm {
  title: string;
  slug: string;
  intro: string;
  content: string;
}

const empty: PostForm = { title: "", slug: "", intro: "", content: "" };

export default function AdminPostEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const adminFetch = useAdminFetch();

  const [form, setForm] = useState<PostForm>(empty);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    adminFetch(`admin/posts/${id}/`)
      .then((r) => r.json())
      .then((data) => setForm({ title: data.title, slug: data.slug, intro: data.intro, content: data.content }))
      .catch(() => setError("Failed to load post"));
  }, [id, isNew, adminFetch]);

  function setField(key: keyof PostForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: isNew ? slugify(title) : f.slug }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    if (thumbnail) body.append("thumbnail", thumbnail);

    const url = isNew ? "admin/posts/" : `admin/posts/${id}/`;
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
      navigate(`/admin/posts/${created.id}`, { replace: true });
    }
    setSuccess(true);
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>{isNew ? "New post" : "Edit post"}</PageTitle>
        <GhostBtn onClick={() => navigate("/admin/posts")}>← Back</GhostBtn>
      </ActionRow>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={handleTitleChange} required />
            </Field>
            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={form.slug} onChange={setField("slug")} required />
            </Field>
            <Field>
              <Label htmlFor="intro">Intro / Excerpt</Label>
              <Textarea id="intro" value={form.intro} onChange={setField("intro")} rows={3} />
            </Field>
            <Field>
              <Label>Thumbnail</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
              />
            </Field>
            <Field>
              <Label>Content (Markdown)</Label>
              <MarkdownEditor
                value={form.content}
                onChange={(v) => setForm((f) => ({ ...f, content: v }))}
              />
            </Field>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <PrimaryBtn type="submit" disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create post" : "Save changes"}
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
