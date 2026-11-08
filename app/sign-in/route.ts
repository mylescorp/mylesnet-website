import { redirect } from "next/navigation";
import { getSignInUrl } from "@workos-inc/authkit-nextjs";

const authConfigured = Boolean(process.env.WORKOS_CLIENT_ID && process.env.WORKOS_API_KEY && process.env.WORKOS_COOKIE_PASSWORD && process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);

export async function GET() {
  if (!authConfigured) redirect("/portal");
  redirect(await getSignInUrl({ returnTo: "/portal" }));
}
