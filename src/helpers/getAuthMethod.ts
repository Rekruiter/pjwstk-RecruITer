import AuthMethods from '../constants/authMethods';

export type AuthMethodType = (typeof AuthMethods)[number];

export const getAuthMethod = (value: string | null): AuthMethodType | null => {
  if (!value) return null;
  if ((AuthMethods as readonly string[]).includes(value)) {
    return value as AuthMethodType;
  }
  return null;
};
