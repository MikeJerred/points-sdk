# Example

```typescript
import { createCampaign, createClient } from '@mikejerred/points-sdk';

const { apiKey, campaignId } = await createCampaign();
const client = createClient(apiKey, campaignId);

await client.distributePoints(
  'event_name',
  { points: 1000, address: '0x24e5bec76fa3d750bfa97bdbf16b377f6b13af15' },
);

const points = await client.getPoints('0x24e5bec76fa3d750bfa97bdbf16b377f6b13af15');
```
