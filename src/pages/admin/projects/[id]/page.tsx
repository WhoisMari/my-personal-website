import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageTitle, Card, FormGrid, Field, Label, Input,
  PrimaryBtn, GhostBtn, DangerBtn, ErrorMsg, SuccessMsg, ActionRow,
} from "../../../../components/Admin/AdminStyles";
import MarkdownEditor from "../../../../components/Admin/MarkdownEditor";
import TagInput from "../../../../components/Admin/TagInput";
import { useAdminFetch } from "../../../../hooks/useAdminFetch";
import config from "../../../../config.json";

// ── Gallery styles ────────────────────────────────────────────────────────────

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 32px 0 16px;
  color: ${({ theme }) => theme.text};
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`;

const ImageTile = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: ${({ theme }) => theme.modal_border};
  background: ${({ theme }) => theme.bg1};
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
`;

const TileFooter = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CaptionInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  outline: none;
  min-width: 0;
  &::placeholder { opacity: 0.4; }
`;

const UploadZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 4/3;
  border: 2px dashed ${({ theme }) => theme.color1};
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color1};
  font-size: 0.85rem;
  opacity: 0.7;
  transition: opacity 0.15s, background 0.15s;
  &:hover { opacity: 1; background: ${({ theme }) => theme.bg2}; }
`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectForm {
  title: string;
  content: string;
  github: string;
  link: string;
  stack_tags: string[];
  project_tags: string[];
}

interface GalleryImage {
  id: number;
  image: string;
  caption: string;
}

const empty: ProjectForm = { title: "", content: "", github: "", link: "", stack_tags: [], project_tags: [] };

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminProjectEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const adminFetch = useAdminFetch();

  const [form, setForm] = useState<ProjectForm>(empty);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    adminFetch(`admin/projects/${id}/`)
      .then((r) => r.json())
      .then((data) => setForm({
        title: data.title,
        content: data.content,
        github: data.github,
        link: data.link,
        stack_tags: (data.stack_tags ?? []).map((t: { title: string }) => t.title),
        project_tags: (data.project_tags ?? []).map((t: { title: string }) => t.title),
      }))
      .catch(() => setError("Failed to load project"));

    adminFetch(`admin/projects/${id}/images/`)
      .then((r) => r.json())
      .then(setImages)
      .catch(() => {});
  }, [id, isNew, adminFetch]);

  function setField(key: keyof Pick<ProjectForm, "title" | "github" | "link">) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const body = new FormData();
    body.append("title", form.title);
    body.append("github", form.github);
    body.append("link", form.link);
    body.append("content", form.content);
    if (thumbnail) body.append("thumbnail", thumbnail);

    // Tags: always append (empty string signals clear)
    if (form.stack_tags.length > 0) {
      form.stack_tags.forEach((t) => body.append("stack_tags", t));
    } else {
      body.append("stack_tags", "");
    }
    if (form.project_tags.length > 0) {
      form.project_tags.forEach((t) => body.append("project_tags", t));
    } else {
      body.append("project_tags", "");
    }

    const url = isNew ? "admin/projects/" : `admin/projects/${id}/`;
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
      navigate(`/admin/projects/${created.id}`, { replace: true });
      return;
    }
    setSuccess(true);
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files || isNew) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("image", file);
      const res = await adminFetch(`admin/projects/${id}/images/`, { method: "POST", body });
      if (res.ok) {
        const img = await res.json();
        setImages((prev) => [...prev, img]);
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDeleteImage(imageId: number) {
    await adminFetch(`admin/project-images/${imageId}/`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  async function handleCaptionBlur(imageId: number, caption: string) {
    await adminFetch(`admin/project-images/${imageId}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption }),
    });
  }

  function imageUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${config.server_url.replace("/api", "")}${path}`;
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>{isNew ? "New project" : "Edit project"}</PageTitle>
        <GhostBtn onClick={() => navigate("/admin/projects")}>← Back</GhostBtn>
      </ActionRow>

      <Card>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={setField("title")} required />
            </Field>
            <Field>
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" type="url" value={form.github} onChange={setField("github")} />
            </Field>
            <Field>
              <Label htmlFor="link">Live URL</Label>
              <Input id="link" type="url" value={form.link} onChange={setField("link")} />
            </Field>
            <Field>
              <Label>Stack Tags</Label>
              <TagInput
                value={form.stack_tags}
                onChange={(tags) => setForm((f) => ({ ...f, stack_tags: tags }))}
                placeholder="React, Django… press Enter"
              />
            </Field>
            <Field>
              <Label>Project Tags</Label>
              <TagInput
                value={form.project_tags}
                onChange={(tags) => setForm((f) => ({ ...f, project_tags: tags }))}
                placeholder="Movies, Music… press Enter"
              />
            </Field>
            <Field>
              <Label>Thumbnail</Label>
              <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)} />
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
                {saving ? "Saving…" : isNew ? "Create project" : "Save changes"}
              </PrimaryBtn>
              {error && <ErrorMsg>{error}</ErrorMsg>}
              {success && <SuccessMsg>Saved!</SuccessMsg>}
            </div>
          </FormGrid>
        </form>
      </Card>

      {!isNew && (
        <>
          <SectionTitle>Gallery images</SectionTitle>
          <ImageGrid>
            {images.map((img) => (
              <ImageTile key={img.id}>
                <Thumb src={imageUrl(img.image)} alt={img.caption} />
                <TileFooter>
                  <CaptionInput
                    value={img.caption}
                    placeholder="Caption…"
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((i) => (i.id === img.id ? { ...i, caption: e.target.value } : i))
                      )
                    }
                    onBlur={(e) => handleCaptionBlur(img.id, e.target.value)}
                  />
                  <DangerBtn
                    style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    ✕
                  </DangerBtn>
                </TileFooter>
              </ImageTile>
            ))}

            <UploadZone>
              <span style={{ fontSize: "1.5rem" }}>{uploading ? "⏳" : "+"}</span>
              <span>{uploading ? "Uploading…" : "Add images"}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e.target.files)}
                disabled={uploading}
              />
            </UploadZone>
          </ImageGrid>
        </>
      )}
    </>
  );
}
