import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('rooms')
export class RoomEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  link: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creationDate: Date;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @ManyToMany(() => UserEntity)
  members: UserEntity[];
}
