import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "../components/Layout/RootLayout";

const pageModules = require.context("../pages", true, /\/page\.tsx$/);

function filePathToRoutePath(filePath: string): string {
  const dir = filePath.replace(/^\.\//, "").replace(/\/page\.tsx$/, "");

  if (dir === "home") return "/";
  if (dir === "error") return "*";

  return "/" + dir.replace(/\[(\w+)\]/g, ":$1") + "/";
}

const childRoutes: RouteObject[] = pageModules
  .keys()
  .map((filePath: string) => {
    const Component = pageModules(filePath).default as React.ComponentType;
    return {
      path: filePathToRoutePath(filePath),
      element: <Component />,
    };
  })
  .sort((a, b) => {
    if (a.path === "*") return 1;
    if (b.path === "*") return -1;
    return 0;
  });

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: childRoutes,
  },
]);

export default router;
