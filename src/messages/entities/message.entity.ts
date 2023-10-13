import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';

@Entity({ name: 'messages' })
export class MessageEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.link)
  room: RoomEntity;

  @Column()
  timestamp: Date;
}
