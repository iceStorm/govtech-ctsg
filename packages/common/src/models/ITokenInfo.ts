import { JWTPayload } from 'jose';

export type TokenPayload = {
  /**
   * Govaa username.
   */
  name: string;

  /**
   * Govaa user email.
   */
  email: string;

  /**
   * Whether a govaa user is registered on surveysg or not.
   */
  isRegistered: boolean;
};

type ITokenInfo = JWTPayload & TokenPayload;

export default ITokenInfo;
