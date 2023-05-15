// requestQueue.ts
import axios, { AxiosResponse, Method } from 'axios';

interface Request {
  url: string;
  method: Method;
  data?: any;
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: any) => void;
}

class RequestQueue {
  private queue: Request[];
  private maxRequestsPerSecond: number;
  private burstRequests: number;
  private burstTime: number;
  private requestsMade: number;
  private burstRequestsMade: number;
  private sending: boolean;

  constructor(maxRequestsPerSecond: number, burstRequests: number, burstTime: number) {
    this.queue = [];
    this.maxRequestsPerSecond = maxRequestsPerSecond;
    this.burstRequests = burstRequests;
    this.burstTime = burstTime;
    this.requestsMade = 0;
    this.burstRequestsMade = 0;
    this.sending = false;
  }

  async sendRequest(url: string, method: Method = 'get', data: any = {}): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const request: Request = {
        url,
        method,
        data,
        resolve,
        reject,
      };

      this.queue.push(request);

      if (!this.sending) {
        this.sending = true;
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.sending = false;
      return;
    }

    if (
      this.requestsMade < this.maxRequestsPerSecond ||
      this.burstRequestsMade < this.burstRequests
    ) {
      const { url, method, data, resolve, reject } = this.queue.shift() as Request;

      try {
        const response = await axios({ url, method, data });
        resolve(response);

        if (this.burstRequestsMade < this.burstRequests) {
          this.burstRequestsMade++;
        } else {
          this.requestsMade++;
        }
      } catch (error) {
        reject(error);
      }
    }

    setTimeout(() => {
      this.processQueue();
    }, this.getRequestDelay());
  }

  private getRequestDelay() {
    const delayBetweenRequests = 1000 / this.maxRequestsPerSecond;
    const burstWindowReset = this.burstTime * 1000;
    const rateLimitReset = 1000;

    setTimeout(() => {
      this.requestsMade = 0;
    }, rateLimitReset);

    setTimeout(() => {
      this.burstRequestsMade = 0;
    }, burstWindowReset);

    return delayBetweenRequests;
  }
}

export default RequestQueue;
