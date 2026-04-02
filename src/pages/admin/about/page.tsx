import React, { useEffect, useState, FormEvent } from "react";
import {
  PageTitle, Card, FormGrid, Field, Label, Textarea,
  PrimaryBtn, ErrorMsg, SuccessMsg,
} from "../../../components/Admin/AdminStyles";
import MarkdownEditor from "../../../components/Admin/MarkdownEditor";
import { useAdminFetch } from "../../../hooks/useAdminFetch";

interface PostForm {
  id?: number;
  title: string;
  slug: string;
  intro: string;
  content: string;
}

export default function AdminAboutPage() {
  const adminFetch = useAdminFetch();
  const [form, setForm] = useState<PostForm>({ title: "About Me", slug: "about", intro: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    adminFetch("admin/posts/")
      .then((r) => r.json())
      .then((posts: PostForm[]) => {
        const about = posts.find((p) => p.slug === "about");
        if (about) setForm(about);
      })
      .catch(() => setError("Failed to load"));
  }, [adminFetch]);

  function setField(key: keyof PostForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const body = new FormData();
    body.append("title", form.title);
    body.append("slug", form.slug);
    body.append("intro", form.intro);
    body.append("content", form.content);

    const url = form.id ? `admin/posts/${form.id}/` : "admin/posts/";
    const method = form.id ? "PUT" : "POST";
    const res = await adminFetch(url, { method, body });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(JSON.stringify(data));
      return;
    }

    const saved = await res.json();
    setForm((f) => ({ ...f, id: saved.id }));
    setSuccess(true);
  }

  return (
    <>
      <PageTitle>About</PageTitle>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <Label htmlFor="intro">Intro text</Label>
              <Textarea id="intro" value={form.intro} onChange={setField("intro")} rows={3} />
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
                {saving ? "Saving…" : "Save changes"}
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
