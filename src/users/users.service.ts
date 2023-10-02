import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this._userRepository.create(createUserDto);
    return this._userRepository.save(user);
  }

  findAll() {
    return this._userRepository.find();
  }

  findOne(username: string) {
    return this._userRepository.findOne({ where: { username: username } });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this._userRepository.update(username, updateUserDto);
  }

  remove(username: string) {
    return this._userRepository.delete(username);
  }
}
