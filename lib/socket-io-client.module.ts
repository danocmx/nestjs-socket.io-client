import io from "socket.io-client";
import { DiscoveryModule } from '@nestjs/core';
import { Module, DynamicModule } from "@nestjs/common";
import { SocketOptions, ManagerOptions } from "socket.io-client";
import { SocketIoEventLoader } from "./socket-io-event.loader";
import { SOCKET_IO_CLIENT } from "./constants";

@Module({})
export class SocketIoClientModule {
  // TODO: remove unnecessery dependencies
  // TODO: add ability to have multiple client connections
  // TODO: Make this agnostic for client version and options
  forRoot(options: Partial<SocketOptions & ManagerOptions>): DynamicModule {
    return {
      module: SocketIoClientModule,
      global: true,
      imports: [DiscoveryModule],
      providers: [
        {
          provide: SOCKET_IO_CLIENT,
          useValue: io(options),
        },
        SocketIoEventLoader,
      ],
      exports: [],
    }
  }
}
