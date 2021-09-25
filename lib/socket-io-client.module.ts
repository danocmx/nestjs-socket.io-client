import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { SOCKET_IO_CLIENT, SOCKET_OPTIONS } from './constants';
import { SocketIoEventLoader } from './socket-io-event.loader';

@Module({})
export class SocketIoClientModule {
  static forRoot<TOptions = Partial<ManagerOptions & SocketOptions>>(
    url: string,
    options?: TOptions,
  ): DynamicModule {
    return {
      module: SocketIoClientModule,
      global: true,
      imports: [DiscoveryModule],
      providers: [
        {
          provide: SOCKET_OPTIONS,
          useValue: options,
        },
        {
          provide: SOCKET_IO_CLIENT,
          useFactory: async () => {
            const { io } = await import('socket.io-client');

            return io(url, {
              ...(options || {}),
              /**
               * Connect after events are subscribed to.
               */
              autoConnect: false,
            });
          },
        },
        SocketIoEventLoader,
      ],
      exports: [],
    };
  }
}
