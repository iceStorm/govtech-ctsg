import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class SurveyUserEntity {
  @PrimaryColumn()
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

  checkedTermsOfUse!: boolean;
}
