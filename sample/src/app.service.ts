import { Inject, Injectable } from '@nestjs/common';
import { SOCKET_IO_CLIENT } from 'nestjs-socket.io-client';
import { Socket } from 'socket.io-client';

@Injectable()
export class AppService {
  constructor(@Inject(SOCKET_IO_CLIENT) private socket: Socket) {}

  getHello() {
    return this.socket.emit('hello', 'Hello World!', (response) => {
      console.log(response);
    });
  }
}
