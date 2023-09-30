import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
