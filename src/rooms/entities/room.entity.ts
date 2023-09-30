import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

export class RoomEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;
}
