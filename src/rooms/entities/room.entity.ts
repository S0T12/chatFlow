import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

export class RoomEntity {
  @ObjectIdColumn({ type: 'int' })
  id: ObjectId;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;
}
