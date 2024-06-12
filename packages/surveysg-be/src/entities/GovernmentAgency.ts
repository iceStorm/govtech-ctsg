import { Entity, PrimaryColumn } from 'typeorm';

@Entity('government_agency')
export default class GovernmentAgencyEntity {
  @PrimaryColumn()
  name: string;
}
