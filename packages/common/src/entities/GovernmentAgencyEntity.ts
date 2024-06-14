import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('government_agency')
export default class GovernmentAgencyEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
