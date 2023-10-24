import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './schemas/message.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('messages') private readonly messageModel: Model<Message>,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
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

    return savedMessage;
  }

  async findAll() {
    return await this.messageModel.find().exec();
  }

  async findOne(id: string) {
    const objectId = new Types.ObjectId(id);
    const message = await this.messageModel.findOne({ _id: objectId }).exec();
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .exec();
    if (!updatedMessage) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return updatedMessage;
  }

  async remove(id: string) {
    const messageId = new Types.ObjectId(id);
    const deletedMessage = await this.messageModel
      .findByIdAndDelete(messageId)
      .exec();
    if (!deletedMessage) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return { deleted: true };
  }
}
