import { expect, jest, test } from '@jest/globals';

import { createCampaign, createClient } from './index';

test('can create client', () => {
  const apiKey = 'a-b-c-d-e';
  const campaignId = 1234;
  const client = createClient(apiKey, campaignId);

  expect(client).toBeDefined();
});

test('can create campaign', async () => {
  const apiKey = 'a-b-c-d-e';
  const campaignId = 1234;

  jest.spyOn(global, 'fetch').mockImplementation(async () => ({
    status: 200,
    json: async () => ({ apiKey, campaignId }),
  } as Response));

  const result = await createCampaign();

  expect(result.apiKey).toBe(apiKey);
  expect(result.campaignId).toBe(campaignId);
});
