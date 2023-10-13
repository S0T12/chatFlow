import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import Redis from 'ioredis';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class MessagesService {
  private redisClient: Redis;

  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {
    this.redisClient = new Redis();
  }

  async create(createMessageDto: CreateMessageDto) {
    try {
      console.log(
        'Received request to create message with DTO:',
        createMessageDto,
      );
      const { content, senderUsername, roomLink } = createMessageDto;

      const sender = await this.usersService.findOne(senderUsername);
      console.log('Retrieved sender:', sender);

      const room = await this.roomsService.findOne(roomLink);
      console.log('Retrieved room:', room);

      if (!sender) throw new Error('Sender not found');
      if (!room) throw new Error('Room not found');

      const message = this.messageRepo.create({
        content,
        sender,
        room,
      });
      console.log('Created message object:', message);

      const savedMessage = await this.messageRepo.save(message);
      console.log('Saved message object:', savedMessage);
      return savedMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.messageRepo.find();
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
