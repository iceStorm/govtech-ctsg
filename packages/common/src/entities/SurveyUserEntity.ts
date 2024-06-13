import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class SurveyUserEntity {
  @PrimaryColumn()
  @IsString()
  email!: string;

  @Column()
  @IsString()
  name!: string;

  @Column()
  @IsString()
  agencyName!: string;

  @Column()
  @IsString()
  jobScopeDescription!: string;

  checkedTermsOfUse!: boolean;
}
