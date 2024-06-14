/* eslint-disable max-classes-per-file */
import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export class GovaaLoginEntity {
  @PrimaryColumn()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;
}

@Entity('govaa_user')
export class GovaaUserEntity extends GovaaLoginEntity {
  @Column()
  @IsString()
  name: string;
}

export type GovaaLoginResponse = {
  name: string;
};
