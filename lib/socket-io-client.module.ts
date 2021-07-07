import { DiscoveryModule } from '@nestjs/core';
import { Module, DynamicModule } from '@nestjs/common';
import { SocketIoEventLoader } from './socket-io-event.loader';
import { SOCKET_IO_CLIENT, SOCKET_OPTIONS } from './constants';

@Module({})
export class SocketIoClientModule {
  forRoot<TOptions = Record<string, any>>(
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
