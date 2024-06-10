import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class GovernmentAgency extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
