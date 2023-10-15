import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Room } from '../../rooms/schemas/room.schema';
import { Message } from '../../messages/schemas/message.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  profilePictureUrl: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Room' }])
  rooms: Room[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }])
  messages: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);
