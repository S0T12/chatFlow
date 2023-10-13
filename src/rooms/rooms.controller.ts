import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('link') link: string) {
    return this.roomsService.findOne(link);
  }

  @Patch(':id')
  update(@Param('link') link: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(link, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('link') link: string) {
    return this.roomsService.remove(link);
  }
}
