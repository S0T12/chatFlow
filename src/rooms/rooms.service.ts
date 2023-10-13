import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly _roomRepository: Repository<RoomEntity>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    const room = await this._roomRepository.create(createRoomDto);
    return this._roomRepository.save(room);
  }

  findAll() {
    return this._roomRepository.find();
  }

  findOne(link: string) {
    return this._roomRepository.findOne({ where: { link: link } });
  }

  update(link: string, updateRoomDto: UpdateRoomDto) {
    return this._roomRepository.update(link, updateRoomDto);
  }

  remove(link: string) {
    return this._roomRepository.delete(link);
  }
}
