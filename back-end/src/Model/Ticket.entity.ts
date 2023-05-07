import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class tickets {
  @PrimaryColumn()
  ticket_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  timestamp_created: Date;

  @Column()
  timestamp_modified: Date;

  @Column()
  contact_id: string;
}
