import { Client } from './client';

export { Client } from './client';

const apiBaseUrl = process.env.ABSINTHE_API_URL ?? 'https://api';

export function createClient(
  apiKey: `${string}-${string}-${string}-${string}-${string}`,
  campaignId: number,
) {
  return new Client(apiKey, apiBaseUrl, campaignId);
}

export async function createCampaign(): Promise<{ apiKey: string; campaignId: number; }> {
  const url = new URL(`campaigns/create`, apiBaseUrl);
  const response = await fetch(url, {
    method: 'POST',
  });
  const { apiKey, campaignId } = await response.json();
  return { apiKey, campaignId };
}
