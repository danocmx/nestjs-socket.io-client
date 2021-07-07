export interface ISocket {
  on(event: string, ...params: any[]);
  connect(): ISocket;
  disconnect(): ISocket;
}
