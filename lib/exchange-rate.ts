const CACHE_SECONDS = 60 * 60 * 6;
const DEFAULT_UGX_PER_KES = 28;

type ProviderResponse = {
  result?: string;
  rates?: Record<string, number>;
  time_last_update_unix?: number;
};

export type ExchangeRate = {
  ugxPerKes: number;
  updatedAt: string;
  isFallback: boolean;
};

export async function getExchangeRate(): Promise<ExchangeRate> {
  const configuredFallback = Number(process.env.EXCHANGE_RATE_FALLBACK_UGX_PER_KES);
  const fallback = Number.isFinite(configuredFallback) && configuredFallback > 0
    ? configuredFallback
    : DEFAULT_UGX_PER_KES;

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/KES", {
      next: { revalidate: CACHE_SECONDS },
    });
    if (!response.ok) throw new Error("Exchange-rate provider unavailable");

    const data = (await response.json()) as ProviderResponse;
    const ugxPerKes = data.rates?.UGX;
    if (data.result !== "success" || !ugxPerKes || !Number.isFinite(ugxPerKes)) {
      throw new Error("Exchange-rate provider response invalid");
    }

    return {
      ugxPerKes,
      updatedAt: new Date((data.time_last_update_unix ?? Date.now() / 1000) * 1000).toISOString(),
      isFallback: false,
    };
  } catch {
    // The server-only fallback keeps pricing readable during provider outages.
    // It is never presented as a fixed official exchange rate.
    return { ugxPerKes: fallback, updatedAt: new Date().toISOString(), isFallback: true };
  }
}
