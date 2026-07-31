import { NextResponse } from "next/server";
import { getExchangeRate } from "@/lib/exchange-rate";

export const revalidate = 21600;

export async function GET() {
  const rate = await getExchangeRate();
  return NextResponse.json(rate, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
}
