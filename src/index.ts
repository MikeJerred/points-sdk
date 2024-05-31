import type { UUID } from 'crypto';

import { Client } from './client';

export { Client } from './client';

const apiBaseUrl = process.env.ABSINTHE_API_URL ?? 'http://localhost:8080';

export function createClient(
  apiKey: UUID,
  campaignId: number,
) {
  return new Client(apiKey, apiBaseUrl, campaignId);
}

export async function createCampaign(): Promise<{ apiKey: UUID; campaignId: number; }> {
  const url = new URL(`campaigns/create`, apiBaseUrl);
  const response = await fetch(url, {
    method: 'POST',
  });
  const { apiKey, campaignId } = await response.json();
  return { apiKey, campaignId };
}
