import { Injectable } from '@nestjs/common';
import { ObjectId, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import Redis from 'ioredis';

@Injectable()
export class MessagesService {
  private redisClient: Redis;

  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {
    this.redisClient = new Redis();
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepo.create(createMessageDto);
    await this.messageRepo.save(message);

    await this.redisClient.del('messages');

    return message;
  }

  async findAll() {
    let messages = await this.redisClient.get('messages');

    if (!messages) {
      messages = JSON.stringify(await this.messageRepo.find());
      await this.redisClient.set('messages', messages, 'EX', 20);
    } else {
      messages = JSON.parse(messages);
    }

    return messages;
  }

  async findOne(id: ObjectId) {
    return await this.messageRepo.findOne({ where: { id } });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.messageRepo.update(id, updateMessageDto);

    await this.redisClient.del('messages');

    return { updated: true };
  }

  async remove(id: number) {
    await this.messageRepo.delete(id);

    await this.redisClient.del('messages');

    return { deleted: true };
  }
}
