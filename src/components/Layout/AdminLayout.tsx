import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Sidebar = styled.nav`
  width: 224px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.color1};
  display: flex;
  flex-direction: column;
  padding: 36px 0 28px;
`;

const Brand = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 24px 36px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const NavGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 11px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  border-left: 3px solid transparent;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  &.active {
    color: #fff;
    font-weight: 600;
    border-left-color: #fff;
    background: rgba(255, 255, 255, 0.12);
  }
`;

const Divider = styled.div`
  margin: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`;

const LogoutBtn = styled.button`
  margin: 0 24px;
  padding: 9px 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 40px 48px;
  overflow-y: auto;
`;

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/posts", label: "Blog Posts" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/certificates", label: "Certificates" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <Shell>
      <Sidebar>
        <Brand>whoismari · admin</Brand>
        <NavGroup>
          {navItems.map(({ to, label, end }) => (
            <StyledNavLink key={to} to={to} end={end}>
              {label}
            </StyledNavLink>
          ))}
        </NavGroup>
        <Divider />
        <LogoutBtn onClick={handleLogout}>Log out</LogoutBtn>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
