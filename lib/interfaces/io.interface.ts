import { ISocket } from './socket.interface';

export interface IO {
  (options?: Record<string, unknown>): ISocket;
  (url: string, options?: Record<string, unknown>): ISocket;
}
