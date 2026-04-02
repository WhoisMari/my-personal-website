import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageTitle, Card, ActionRow, PrimaryBtn, DangerBtn, GhostBtn,
  Table, Th, Td, ErrorMsg,
} from "../../../components/Admin/AdminStyles";
import { useAdminFetch } from "../../../hooks/useAdminFetch";

interface Post {
  id: number;
  title: string;
  slug: string;
  timestamp: string;
}

export default function AdminPostsPage() {
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("admin/posts/")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setError("Failed to load posts"));
  }, [adminFetch]);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this post?")) return;
    setDeletingId(id);
    await adminFetch(`admin/posts/${id}/`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>Blog Posts</PageTitle>
        <PrimaryBtn onClick={() => navigate("/admin/posts/new")}>+ New post</PrimaryBtn>
      </ActionRow>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Date</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <Td>{post.title}</Td>
                <Td style={{ opacity: 0.55, fontSize: "0.8rem" }}>{post.slug}</Td>
                <Td style={{ opacity: 0.55, fontSize: "0.8rem" }}>
                  {new Date(post.timestamp).toLocaleDateString()}
                </Td>
                <Td>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <GhostBtn onClick={() => navigate(`/admin/posts/${post.id}`)}>
                      Edit
                    </GhostBtn>
                    <DangerBtn
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                    >
                      Delete
                    </DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <Td colSpan={4} style={{ textAlign: "center", opacity: 0.4 }}>
                  No posts yet
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
