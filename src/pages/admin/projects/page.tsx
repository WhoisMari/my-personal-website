import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageTitle, Card, ActionRow, PrimaryBtn, DangerBtn, GhostBtn,
  Table, Th, Td, ErrorMsg,
} from "../../../components/Admin/AdminStyles";
import { useAdminFetch } from "../../../hooks/useAdminFetch";

interface Project {
  id: number;
  title: string;
  github: string;
  link: string;
  timestamp: string;
}

export default function AdminProjectsPage() {
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("admin/projects/")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setError("Failed to load projects"));
  }, [adminFetch]);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this project?")) return;
    setDeletingId(id);
    await adminFetch(`admin/projects/${id}/`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>Projects</PageTitle>
        <PrimaryBtn onClick={() => navigate("/admin/projects/new")}>+ New project</PrimaryBtn>
      </ActionRow>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <Td>{project.title}</Td>
                <Td style={{ opacity: 0.55, fontSize: "0.8rem" }}>
                  {new Date(project.timestamp).toLocaleDateString()}
                </Td>
                <Td>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <GhostBtn onClick={() => navigate(`/admin/projects/${project.id}`)}>
                      Edit
                    </GhostBtn>
                    <DangerBtn
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                    >
                      Delete
                    </DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <Td colSpan={3} style={{ textAlign: "center", opacity: 0.4 }}>
                  No projects yet
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
