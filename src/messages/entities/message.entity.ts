import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';

@Entity('message')
export class MessageEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => RoomEntity)
  room: RoomEntity;

  @Column()
  timestamp: Date;

  @Column({ default: false })
  deleted: boolean;
}
