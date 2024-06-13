import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import IsTrue from '../validators/IsTrue';

@Entity('user')
export default class SurveyUserEntity {
  @PrimaryColumn()
  @IsEmail()
  govaaEmail!: string; // govaa email

  @Column()
  @IsEmail()
  contactEmail!: string;

  @Column()
  @IsString()
  name!: string; // govaa name

  @Column()
  @IsString()
  agencyName!: string;

  @Column()
  @IsString()
  jobScopeDescription!: string;

  // don't save this field in the database
  // but still need to validate as request payload for account creation
  @IsTrue()
  checkedTermsOfUse!: boolean;
}
