import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface Job {
  id: string;
  createdAt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  priority?: number;
  retryCount?: number;
  data?: any;
  execute: () => void;
}

type ConstructArgs = {
  maxRequestsPerSecond: number,
  burstRequests: number,
  burstTime: number;
  instance: AxiosInstance
}

class RequestQueue {
  private instance: AxiosInstance;
  private queue: Job[];
  private maxRequestsPerSecond: number;
  private burstRequests: number;
  private burstTime: number;
  private requestsMade: number;
  private burstRequestsMade: number;
  private sending: boolean;

  constructor({maxRequestsPerSecond, burstRequests, burstTime, instance}: ConstructArgs) {
    this.queue = [];
    this.maxRequestsPerSecond = maxRequestsPerSecond;
    this.burstRequests = burstRequests;
    this.burstTime = burstTime;
    this.requestsMade = 0;
    this.burstRequestsMade = 0;
    this.sending = false;

    this.instance = instance ?? axios.create();
    this.addRequestInterceptor();
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
      const { execute } = this.queue.shift() as Job;
      
      try {
        if (this.burstRequestsMade < this.burstRequests) {
          this.burstRequestsMade++;
        } else {
          this.requestsMade++;
        }
        execute()
      } catch (error) {
        // we retry if we hit an error
        // Idk what axios does when we throw in the interceptor
        console.log(error)
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
  private handleRequestSent() {
      if (this.burstRequestsMade < this.burstRequests) {
        this.burstRequestsMade++;
      } else {
        this.requestsMade++;
      }

      setTimeout(() => {
        this.requestsMade = 0;
      }, 1000);

      setTimeout(() => {
        this.burstRequestsMade = 0;
      }, this.burstTime * 1000);
    }
  // should also ad a response interceptor to update 
  // the queue information based on returned rate limit data
  private addRequestInterceptor() {
    this.instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      return new Promise<AxiosRequestConfig>(async (resolve) => {
        const executeJob = () => {
          resolve(config);
          this.handleRequestSent();
        };
        const newJob: Job = {
          id: this.generateUniqueId(),
          createdAt: new Date().toISOString(),
          status: 'queued',
          execute: executeJob,
        };
        
        this.queue.push(newJob);
          
        if (!this.sending) {
          this.sending = true;
          this.processQueue();
        }
      });
    });
      
  }
    private generateUniqueId(): string {
      return (
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      ).toUpperCase();
    }
    getInstance(): AxiosInstance {
      return this.instance;
    }
}

export default RequestQueue;
