import { Column, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';

export class MessageEntity {
  @ObjectIdColumn({ type: 'int2' })
  id: ObjectId;

  @Column({ type: 'varchar2' })
  content: string;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => RoomEntity)
  room: RoomEntity;

  @Column({ type: 'bool' })
  deleted: boolean;
}
