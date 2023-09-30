import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
