import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // TODO: use of bcrypt for password.
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ username }, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return updatedUser;
  }

  async remove(username: string) {
    const deletedUser = await this.userModel
      .findOneAndDelete({ username })
      .exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return { deleted: true };
  }
}
