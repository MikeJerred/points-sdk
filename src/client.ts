import type { UUID } from 'crypto';

export class Client {
  constructor(
    private apiKey: UUID,
    private apiUrl: string,
    private campaignId: number,
  ) {}

  async getPoints(address: `0x${string}`, eventName?: string): Promise<number> {
    const url = new URL(`campaigns/${this.campaignId}/points`, this.apiUrl);
    url.searchParams.set('address', address);
    if (eventName) {
      url.searchParams.set('event', eventName);
    }

    const response = await fetch(url, {
      headers: this.createHeaders(),
    });
    return await response.json();
  }

  async distributePoints(eventName: string, pointsData: { points: number, address: `0x${string}` }) {
    const url = new URL(`campaigns/${this.campaignId}/points`, this.apiUrl);

    await fetch(url, {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify({
        address: pointsData.address,
        event: eventName,
        points: pointsData.points,
      }),
    });
  }

  private createHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    };
  }
}
