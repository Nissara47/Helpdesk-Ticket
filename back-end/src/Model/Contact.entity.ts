import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class contacts {
  @PrimaryColumn()
  contact_id: string;

  @Column()
  contact_firstname: string;

  @Column()
  contact_lastname: string;

  @Column()
  email: string;

  @Column()
  tel: string;
}
