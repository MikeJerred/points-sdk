# Points SDK

A client SDK for interacting with the points REST API.
The base URL for the API Server can be set with the `ABSINTHE_API_URL` environment variable, it defaults to `http://localhost:8080`.

## Installation

Install from npm:

```bash
npm install @mikejerred/points-sdk --save
```

## Usage Example

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
