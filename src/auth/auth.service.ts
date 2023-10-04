import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validationUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const validateUser = this.validationUser(username, password);
    if (!validateUser) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const payload = { username: username, sub: username };
    const token = await this.jwtService.signAsync(payload);
    return { authToken: token };
  }
}
