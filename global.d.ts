import api from '../src/api/api';
import type { AxiosInstance } from 'axios';
export {};

declare global {
  interface Global {
    api: {
        get: (url: string) => Promise<any>;
    }
  }

  interface GlobalThis {
    api: typeof api;
  }
}
