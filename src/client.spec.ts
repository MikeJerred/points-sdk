import { afterEach, expect, jest, test } from '@jest/globals';

import { Client } from './client';

afterEach(() => {
  jest.restoreAllMocks();
});

test('can get points', async () => {
  const address = '0x24e5bec76fa3d750bfa97bdbf16b377f6b13af15';
  const points = 1000;

  const spy = jest.spyOn(global, 'fetch').mockImplementation(async () => ({
    status: 200,
    json: async () => points,
  } as Response));

  const client = new Client('a-b-c-d-e', 'https://test.url', 1234);

  const result = await client.getPoints(address);

  expect(result).toBe(points);
  expect(spy).toHaveBeenCalled();
  const [url, options] = spy.mock.calls[0];
  expect(url.toString()).toBe(`https://test.url/campaigns/1234/points?address=${address}`);
  expect((options?.headers as Record<string, string>)?.['X-API-KEY']).toBe('a-b-c-d-e');
});

test('can get points with event name', async () => {
  const address = '0x24e5bec76fa3d750bfa97bdbf16b377f6b13af15';
  const eventName = 'test';
  const points = 1000;

  const spy = jest.spyOn(global, 'fetch').mockImplementation(async () => ({
    status: 200,
    json: async () => points,
  } as Response));

  const client = new Client('a-b-c-d-e', 'https://test.url', 1234);

  const result = await client.getPoints(address, eventName);

  expect(result).toBe(points);
  expect(spy).toHaveBeenCalled();
  const [url, options] = spy.mock.calls[0];
  expect(url.toString()).toBe(`https://test.url/campaigns/1234/points?address=${address}&event=${eventName}`);
  expect((options?.headers as Record<string, string>)?.['X-API-KEY']).toBe('a-b-c-d-e');
});

test('can distribute points', async () => {
  const address = '0x24e5bec76fa3d750bfa97bdbf16b377f6b13af15';
  const eventName = 'test';
  const points = 1000;

  const spy = jest.spyOn(global, 'fetch').mockImplementation(async () => ({
    status: 204,
  } as Response));

  const client = new Client('a-b-c-d-e', 'https://test.url', 1234);

  await client.distributePoints(eventName, { points, address });

  expect(spy).toHaveBeenCalled();
  const [url, options] = spy.mock.calls[0];
  expect(options?.method).toBe('POST');
  expect(url.toString()).toBe(`https://test.url/campaigns/1234/points`);
  expect(JSON.parse(options?.body?.toString() ?? '')).toStrictEqual({
    address,
    event: eventName,
    points,
  });
  expect((options?.headers as Record<string, string>)?.['X-API-KEY']).toBe('a-b-c-d-e');
});
