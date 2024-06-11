import { IsEmail, IsString } from 'class-validator';

export class GovaaLoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export type GovaaLoginResponse = {
  name: string;
};

export type GovaaUser = GovaaLoginPayload & GovaaLoginResponse;
