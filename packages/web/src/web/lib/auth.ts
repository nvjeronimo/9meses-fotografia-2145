import { createAuthClient } from "better-auth/react";

const TOKEN_KEY = "9meses.admin.token";

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

function setAuthToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable (private mode) — cookie session still applies
  }
}

/**
 * Admin auth client. The bearer token is persisted so the session survives
 * third-party-cookie blocking inside the Runable preview iframe.
 */
export const authClient = createAuthClient({
  baseURL: window.location.origin,
  basePath: "/api/auth",
  fetchOptions: {
    auth: { type: "Bearer", token: getAuthToken },
    onSuccess: (ctx) => {
      const token = ctx.response.headers.get("set-auth-token");
      if (token) setAuthToken(token);
    },
  },
});

export async function signOut() {
  await authClient.signOut();
  setAuthToken(null);
}
