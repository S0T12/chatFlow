import { Column, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';

export class MessageEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => RoomEntity)
  room: RoomEntity;
}
