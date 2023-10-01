import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity('rooms')
export class RoomEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creationDate: Date;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToMany(() => UserEntity)
  admins: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.room)
  messages: MessageEntity[];
}
