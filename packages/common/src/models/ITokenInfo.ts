import { JWTPayload } from 'jose';

export type TokenPayload = {
  name: string;
  email: string;
};

type ITokenInfo = JWTPayload & TokenPayload;

export default ITokenInfo;
