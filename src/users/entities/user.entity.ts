import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { RoomEntity } from '../../rooms/entities/room.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @ManyToMany(() => RoomEntity)
  rooms: RoomEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  messages: MessageEntity[];
}
