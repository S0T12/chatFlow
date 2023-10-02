import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsUrl()
  profilePictureUrl: string;
}
