import { IsEmail, IsString } from 'class-validator';

export default class LoginPayload {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
