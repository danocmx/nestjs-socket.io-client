import io from "socket.io-client";
import { DiscoveryModule } from '@nestjs/core';
import { Module, DynamicModule } from "@nestjs/common";
import { SocketOptions, ManagerOptions } from "socket.io-client";
import { SocketIoEventLoader } from "./socket-io-event.loader";
import { SOCKET_IO_CLIENT, SOCKET_OPTIONS } from "./constants";

@Module({})
export class SocketIoClientModule {
  forRoot(url: string, options: Partial<SocketOptions & ManagerOptions> = {}): DynamicModule {
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
          useValue: io(url, {
            ...options,
            /**
             * Connect after events are subscribed to.
             */
            autoConnect: false,
          }),
        },
        SocketIoEventLoader,
      ],
      exports: [],
    }
  }
}
