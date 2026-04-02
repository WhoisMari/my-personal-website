import config from "../config.json";

type TokenGetter = () => string | null;
type TokenRefresher = () => Promise<string | null>;

export function createAdminFetch(getToken: TokenGetter, refreshToken: TokenRefresher) {
  return async function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
    const token = getToken();
    const headers = new Headers(options.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let res = await fetch(`${config.server_url}/${path}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        res = await fetch(`${config.server_url}/${path}`, {
          ...options,
          headers,
        });
      }
    }

    return res;
  };
}
