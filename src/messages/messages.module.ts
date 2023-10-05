import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
