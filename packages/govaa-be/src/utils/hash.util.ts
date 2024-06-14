import bcrypt from 'bcrypt';

export const hashPassword = async (rawPassword: string) => {
  return bcrypt.hash(rawPassword, 10);
};

export const verifyPassword = async (rawPassword: string, hashedPassword: string) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
