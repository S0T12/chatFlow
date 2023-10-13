import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  senderUsername: string;

  @IsMongoId()
  roomLink: string;
}
