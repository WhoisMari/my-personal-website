import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageTitle, Card, ActionRow, PrimaryBtn, DangerBtn, GhostBtn,
  Table, Th, Td, ErrorMsg,
} from "../../../components/Admin/AdminStyles";
import { useAdminFetch } from "../../../hooks/useAdminFetch";

interface Certificate {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

export default function AdminCertificatesPage() {
  const adminFetch = useAdminFetch();
  const navigate = useNavigate();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("admin/certificates/")
      .then((r) => r.json())
      .then(setCerts)
      .catch(() => setError("Failed to load certificates"));
  }, [adminFetch]);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this certificate?")) return;
    setDeletingId(id);
    await adminFetch(`admin/certificates/${id}/`, { method: "DELETE" });
    setCerts((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
  }

  return (
    <>
      <ActionRow>
        <PageTitle style={{ margin: 0 }}>Certificates</PageTitle>
        <PrimaryBtn onClick={() => navigate("/admin/certificates/new")}>+ New certificate</PrimaryBtn>
      </ActionRow>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Card>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {certs.map((cert) => (
              <tr key={cert.id}>
                <Td>{cert.title}</Td>
                <Td style={{ opacity: 0.55, fontSize: "0.8rem", maxWidth: 220 }}>
                  {cert.description?.slice(0, 60) || "—"}
                </Td>
                <Td style={{ opacity: 0.55, fontSize: "0.8rem" }}>
                  {new Date(cert.timestamp).toLocaleDateString()}
                </Td>
                <Td>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <GhostBtn onClick={() => navigate(`/admin/certificates/${cert.id}`)}>
                      Edit
                    </GhostBtn>
                    <DangerBtn
                      onClick={() => handleDelete(cert.id)}
                      disabled={deletingId === cert.id}
                    >
                      Delete
                    </DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
            {certs.length === 0 && (
              <tr>
                <Td colSpan={4} style={{ textAlign: "center", opacity: 0.4 }}>
                  No certificates yet
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
