import { expect, test } from '@jest/globals';

import { createClient } from './index';

test('can create client', () => {
  const apiKey = 'a-b-c-d-e';
  const campaignId = 1234;
  const client = createClient(apiKey, campaignId);

  expect(client).toBeDefined();
});
