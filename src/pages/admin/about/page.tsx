import React, { useEffect, useState, FormEvent } from "react";
import styled from "styled-components";
import {
  PageTitle, Card, FormGrid, Field, Label, Textarea,
  PrimaryBtn, GhostBtn, DangerBtn, ErrorMsg, SuccessMsg, Input,
} from "../../../components/Admin/AdminStyles";
import MarkdownEditor from "../../../components/Admin/MarkdownEditor";
import { useAdminFetch } from "../../../hooks/useAdminFetch";
import config from "../../../config.json";

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 32px 0 16px;
  color: ${({ theme }) => theme.text};
`;

const FactCard = styled.div`
  background: ${({ theme }) => theme.post_container};
  border: ${({ theme }) => theme.modal_border};
  border-radius: 10px;
  padding: 16px;
  display: grid;
  gap: 10px;
`;

const FactList = styled.div`
  display: grid;
  gap: 12px;
`;

const FactActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PhotoPreview = styled.img`
  max-height: 260px;
  object-fit: cover;
  object-position: center;
  border: 7px solid #f9f2ef;
  border-radius: 5px;
  display: block;
  margin-top: 8px;
`;

interface PostForm {
  id?: number;
  title: string;
  slug: string;
  intro: string;
  content: string;
  thumbnail?: string;
}

interface FactForm {
  id?: number;
  title: string;
  content: string;
  saving?: boolean;
}

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

export default function AdminAboutPage() {
  const adminFetch = useAdminFetch();
  const [form, setForm] = useState<PostForm>({ title: "About Me", slug: "about", intro: "", content: "" });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [facts, setFacts] = useState<FactForm[]>([]);

  useEffect(() => {
    adminFetch("admin/posts/")
      .then((r) => r.json())
      .then((posts: PostForm[]) => {
        const about = posts.find((p) => p.slug === "about");
        if (about) setForm(about);
      })
      .catch(() => setError("Failed to load"));

    adminFetch("admin/about-facts/")
      .then((r) => r.json())
      .then((data: FactForm[]) => setFacts(data))
      .catch(() => {});
  }, [adminFetch]);

  function setField(key: keyof Pick<PostForm, "title" | "intro">) {
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
    if (photoFile) body.append("thumbnail", photoFile);

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
    setForm((f) => ({ ...f, id: saved.id, thumbnail: saved.thumbnail }));
    setSuccess(true);
  }

  function updateFact(idx: number, key: keyof Pick<FactForm, "title" | "content">, value: string) {
    setFacts((prev) => prev.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));
  }

  function addFact() {
    setFacts((prev) => [...prev, { title: "", content: "" }]);
  }

  async function saveFact(idx: number) {
    const fact = facts[idx];
    setFacts((prev) => prev.map((f, i) => (i === idx ? { ...f, saving: true } : f)));

    const body = JSON.stringify({ title: fact.title, content: fact.content });
    const headers = { "Content-Type": "application/json" };

    let res: Response;
    if (fact.id) {
      res = await adminFetch(`admin/about-facts/${fact.id}/`, { method: "PUT", headers, body });
    } else {
      res = await adminFetch("admin/about-facts/", { method: "POST", headers, body });
    }

    if (res.ok) {
      const saved: FactForm = await res.json();
      setFacts((prev) => prev.map((f, i) => (i === idx ? { ...saved, saving: false } : f)));
    } else {
      setFacts((prev) => prev.map((f, i) => (i === idx ? { ...f, saving: false } : f)));
    }
  }

  async function deleteFact(idx: number) {
    const fact = facts[idx];
    if (fact.id) {
      await adminFetch(`admin/about-facts/${fact.id}/`, { method: "DELETE" });
    }
    setFacts((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <>
      <PageTitle>About</PageTitle>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <Label>Photo</Label>
              {form.thumbnail && !photoFile && (
                <PhotoPreview src={mediaUrl(form.thumbnail)} alt="Current photo" />
              )}
              {photoFile && (
                <PhotoPreview src={URL.createObjectURL(photoFile)} alt="New photo preview" />
              )}
              <input
                type="file"
                accept="image/*"
                style={{ marginTop: 8 }}
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              />
            </Field>
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

      <SectionTitle>A few things about me</SectionTitle>
      <FactList>
        {facts.map((fact, idx) => (
          <FactCard key={fact.id ?? `new-${idx}`}>
            <Field>
              <Label>Title</Label>
              <Input
                value={fact.title}
                onChange={(e) => updateFact(idx, "title", e.target.value)}
                placeholder="Cat person"
              />
            </Field>
            <Field>
              <Label>Content</Label>
              <Textarea
                value={fact.content}
                onChange={(e) => updateFact(idx, "content", e.target.value)}
                rows={3}
                placeholder="Tell us something about you…"
              />
            </Field>
            <FactActions>
              <PrimaryBtn
                type="button"
                disabled={fact.saving}
                onClick={() => saveFact(idx)}
              >
                {fact.saving ? "Saving…" : fact.id ? "Save" : "Create"}
              </PrimaryBtn>
              <DangerBtn type="button" onClick={() => deleteFact(idx)}>
                Delete
              </DangerBtn>
            </FactActions>
          </FactCard>
        ))}
      </FactList>
      <div style={{ marginTop: 16 }}>
        <GhostBtn type="button" onClick={addFact}>+ Add fact</GhostBtn>
      </div>
    </>
  );
}
