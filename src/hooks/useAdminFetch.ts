import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { createAdminFetch } from "../utils/adminFetch";

export function useAdminFetch() {
  const { user, refreshAccess } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => createAdminFetch(() => user?.access ?? null, refreshAccess), [user, refreshAccess]);
}
