import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Message } from '../../messages/schemas/message.schema';

@Schema()
export class Room extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'user' }] })
  members: User[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'message' }] })
  messages: Message[];

  @Prop({ required: true, unique: true })
  link: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
