import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "../components/Layout/RootLayout";
import AdminLayout from "../components/Layout/AdminLayout";
import RequireAuth from "../components/Admin/RequireAuth";

// ── Auto-discover public pages (pages/**/page.tsx, excluding admin/) ──────────
const publicModules = require.context("../pages", true, /\/page\.tsx$/);

function filePathToRoutePath(filePath: string): string {
  const dir = filePath.replace(/^\.\//, "").replace(/\/page\.tsx$/, "");
  if (dir === "home") return "/";
  if (dir === "error") return "*";
  return "/" + dir.replace(/\[(\w+)\]/g, ":$1") + "/";
}

const publicRoutes: RouteObject[] = publicModules
  .keys()
  .filter((p: string) => !p.startsWith("./admin"))
  .map((filePath: string) => {
    const Component = publicModules(filePath).default as React.ComponentType;
    return { path: filePathToRoutePath(filePath), element: <Component /> };
  })
  .sort((a, b) => {
    if (a.path === "*") return 1;
    if (b.path === "*") return -1;
    return 0;
  });

// ── Auto-discover admin pages (pages/admin/**/page.tsx) ───────────────────────
const adminModules = require.context("../pages/admin", true, /\/page\.tsx$/);

function adminFilePathToRoutePath(filePath: string): string {
  const dir = filePath.replace(/^\.\//, "").replace(/\/page\.tsx$/, "");
  if (dir === "index") return "/admin";
  return "/admin/" + dir.replace(/\[(\w+)\]/g, ":$1");
}

const adminRoutes: RouteObject[] = adminModules
  .keys()
  .filter((p: string) => !p.startsWith("./login"))
  .map((filePath: string) => {
    const Component = adminModules(filePath).default as React.ComponentType;
    return {
      path: adminFilePathToRoutePath(filePath),
      element: (
        <RequireAuth>
          <Component />
        </RequireAuth>
      ),
    };
  });

// ── Login page (no auth guard) ────────────────────────────────────────────────
let LoginPage: React.ComponentType = () => null;
try {
  LoginPage = adminModules("./login/page.tsx").default as React.ComponentType;
} catch {}

const router = createBrowserRouter([
  // public site
  {
    element: <RootLayout />,
    children: publicRoutes,
  },
  // admin login — standalone (no sidebar)
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  // admin panel — sidebar layout
  {
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: adminRoutes,
  },
]);

export default router;
