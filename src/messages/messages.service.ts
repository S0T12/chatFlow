import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages') private readonly messageModel: Model<Message>,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { content, senderUsername, roomLink } = createMessageDto;

    const sender = await this.usersService.findOne(senderUsername);
    if (!sender) {
      throw new NotFoundException(
        `Sender with username ${senderUsername} not found`,
      );
    }

    const room = await this.roomsService.findOne(roomLink);
    if (!room) {
      throw new NotFoundException(`Room with link ${roomLink} not found`);
    }

    const createdMessage = new this.messageModel({
      content,
      sender,
      room,
    });

    const savedMessage = await createdMessage.save();

    // Update Redis cache with the new message.
    await this.redisService
      .getClient()
      .set(`message:${savedMessage._id}`, JSON.stringify(savedMessage));

    return savedMessage;
  }

  async findAll() {
    const cachedMessages = await this.redisService.getClient().get('messages');
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }

    const messages = await this.messageModel.find().exec();
    await this.redisService
      .getClient()
      .set('messages', JSON.stringify(messages));

    return messages;
  }

  async findOne(id: string) {
    const cachedMessage = await this.redisService
      .getClient()
      .get(`message:${id}`);
    if (cachedMessage) {
      return JSON.parse(cachedMessage);
    }

    const message = await this.messageModel.findOne({ _id: id }).exec();
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    await this.redisService
      .getClient()
      .set(`message:${id}`, JSON.stringify(message));

    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .exec();
    if (!updatedMessage) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    // Update Redis cache with the updated message.
    await this.redisService
      .getClient()
      .set(`message:${id}`, JSON.stringify(updatedMessage));

    return updatedMessage;
  }

  async remove(id: string) {
    const deletedMessage = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deletedMessage) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    // Remove the message from Redis cache
    await this.redisService.getClient().del(`message:${id}`);

    return { deleted: true };
  }
}
