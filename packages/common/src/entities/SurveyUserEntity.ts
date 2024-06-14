import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import ForeignKeys from '../constants/ForeignKeys';
import IsTrue from '../validators/IsTrue';

import GovernmentAgencyEntity from './GovernmentAgencyEntity';

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

  @ManyToOne(() => GovernmentAgencyEntity, { eager: true })
  @JoinColumn({
    name: 'agencyId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: ForeignKeys.USER__AGENCY,
  })
  @IsNumber()
  agency!: GovernmentAgencyEntity;

  @Column()
  @MaxLength(275)
  @IsString()
  jobScopeDescription!: string;

  // don't save this field in the database
  // but still need to validate as request payload for account creation
  @IsTrue()
  checkedTermsOfUse!: boolean;
}
