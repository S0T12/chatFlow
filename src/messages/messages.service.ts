import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class MessagesService {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const { content, senderUsername, roomLink } = createMessageDto;

      const sender = await this.usersService.findOne(senderUsername);

      const room = await this.roomsService.findOne(roomLink);

      if (!sender) throw new Error('Sender not found');
      if (!room) throw new Error('Room not found');

      const message = this.messageRepo.create({
        content,
        sender,
        room,
      });

      const savedMessage = await this.messageRepo.save(message);
      return savedMessage;
    } catch (error) {
      console.log(error);
      throw new Error('something wrong!');
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

    return { updated: true };
  }

  async remove(id: number) {
    await this.messageRepo.delete(id);

    return { deleted: true };
  }
}
