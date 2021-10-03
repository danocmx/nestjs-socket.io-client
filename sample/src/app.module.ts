import { Module } from '@nestjs/common';
import { SocketIoClientModule } from 'nestjs-socket.io-client';
import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { AppService } from './app.service';

@Module({
  imports: [
    SocketIoClientModule.forRoot<Partial<ManagerOptions & SocketOptions>>(
      'http://localhost:3000',
      {
        autoConnect: false,
      },
    ),
  ],
  providers: [AppService],
})
export class AppModule {}
