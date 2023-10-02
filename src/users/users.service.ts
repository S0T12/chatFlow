import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ObjectId, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this._userRepository.create(createUserDto);
  }

  findAll() {
    return this._userRepository.find();
  }

  findOne(id: ObjectId) {
    return this._userRepository.findOne({ where: { id } });
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this._userRepository.update(id, updateUserDto);
  }

  remove(id: ObjectId) {
    return this._userRepository.delete(id);
  }
}
