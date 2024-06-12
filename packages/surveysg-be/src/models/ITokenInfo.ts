import { JWTPayload } from 'jose';

export type TokenPayload = {
  email: string;
};

type ITokenInfo = JWTPayload & TokenPayload;

export default ITokenInfo;
