# nestjs-socket.io-client
A simple wrapper around socket.io-client for the nestjs framework.

## Instalation
Package has to be installed with the socket.io-client version you want.

Via npm
`npm install nestjs-socket.io-client socket.io-client`

Via yarn
`yarn add nestjs-socket.io-client socket.io-client`

### Note
You can install any version of `socket.io-client` ranging from v2 to v4 and use generics for autocomplete within the `forRoot` path of the module.

## Usage

In your AppModule file:
```ts
import { Module } from "@nestjs/common";
import { SocketIoClientModule } from "nestjs-socket.io-client";
import { ManagerOptions, SocketOptions } from 'socket.io-client';

@Module({
  imports: [
    // Generics allow you to use types for the client you choose
    SocketIoClientModule.forRoot<Partial<ManagerOptions & SocketOptions>>({
      // ... options for the client
      // https://socket.io/docs/v4/client-api/#new-Manager-url-options
    }),
  ],
})
export class AppModule {}
```

And in your service:
```ts
import { Injectable, Inject, Logger } from "@nestjs/common";
import { SocketIoClientModule, OnSocketEvent, SOCKET_IO_CLIENT } from "nestjs-socket.io-client";
import { Socket } from "socket.io-client"

@Injectable()
export class Service {
  private logger = new Logger("Service");

  /**
   * Inject the socket instance and use it's methods this way:
   */ 
  constructor(@Inject(SOCKET_IO_CLIENT) private readonly socket: Socket) {}

  @OnSocketEvent("connect")
  onConnect() {
    this.logger.log("Successfully connected the socket.io server!");
  }
}
```
