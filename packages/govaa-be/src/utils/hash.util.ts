import { pbkdf2 } from 'crypto';

export const hashPassword = (rawPassword: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    pbkdf2(rawPassword, 'lmSCvVDzBIhKNwXm', 1000, 128, 'sha512', (err, derivedKey) => {
      if (err) {
        return reject(err);
      }

      resolve(derivedKey.toString('hex'));
    });
  });
};
