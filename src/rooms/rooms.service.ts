import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('rooms') private readonly roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto) {
    const createdRoom = new this.roomModel(createRoomDto);
    return await createdRoom.save();
  }

  async findAll() {
    return await this.roomModel.find().exec();
  }

  async findOne(link: string) {
    const room = await this.roomModel.findOne({ link }).exec();
    if (!room) {
      throw new NotFoundException(`Room with link ${link} not found`);
    }
    return room;
  }

  async update(link: string, updateRoomDto: UpdateRoomDto) {
    const updatedRoom = await this.roomModel
      .findOneAndUpdate({ link }, updateRoomDto, { new: true })
      .exec();
    if (!updatedRoom) {
      throw new NotFoundException(`Room with link ${link} not found`);
    }
    return updatedRoom;
  }

  async remove(link: string) {
    const deletedRoom = await this.roomModel.findOneAndDelete({ link }).exec();
    if (!deletedRoom) {
      throw new NotFoundException(`Room with link ${link} not found`);
    }
    return { deleted: true };
  }
}
