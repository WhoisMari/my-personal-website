import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../../../components/Admin/AdminStyles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const Tile = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  background: ${({ theme }) => theme.post_container};
  border: ${({ theme }) => theme.modal_border};
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: box-shadow 0.15s;
  &:hover { box-shadow: 0 4px 16px -4px ${({ theme }) => theme.box_shadow}; }
`;

const TileLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const TileDesc = styled.span`
  font-size: 0.8rem;
  opacity: 0.5;
`;

const sections = [
  { to: "/admin/posts", label: "Blog Posts", desc: "Create and edit blog entries" },
  { to: "/admin/about", label: "About", desc: "Edit your about page" },
  { to: "/admin/skills", label: "Skills", desc: "Edit your skills content" },
  { to: "/admin/projects", label: "Projects", desc: "Manage your projects" },
  { to: "/admin/certificates", label: "Certificates", desc: "Manage certifications" },
];

export default function AdminDashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <Grid>
        {sections.map(({ to, label, desc }) => (
          <Tile key={to} to={to}>
            <TileLabel>{label}</TileLabel>
            <TileDesc>{desc}</TileDesc>
          </Tile>
        ))}
      </Grid>
    </>
  );
}
