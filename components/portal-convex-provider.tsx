"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthKitProvider, useAccessToken, useAuth } from "@workos-inc/authkit-nextjs/components";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import { ConvexReactClient } from "convex/react";

export function PortalConvexProvider({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return <AuthKitProvider>{children}</AuthKitProvider>;
  return <ConfiguredPortalProvider url={url}>{children}</ConfiguredPortalProvider>;
}

function ConfiguredPortalProvider({ url, children }: { url: string; children: ReactNode }) {
  const [client] = useState(() => new ConvexReactClient(url));
  return <AuthKitProvider><ConvexProviderWithAuthKit client={client} useAuth={useWorkOSAuth}>{children}</ConvexProviderWithAuthKit></AuthKitProvider>;
}

function useWorkOSAuth() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken } = useAccessToken();
  const fetchToken = useCallback(async () => (await getAccessToken()) ?? null, [getAccessToken]);
  return useMemo(() => ({ isLoading, user, getAccessToken: fetchToken }), [isLoading, user, fetchToken]);
}
