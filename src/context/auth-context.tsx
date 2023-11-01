import React, { ReactNode, useCallback, useState } from 'react';
import { AuthorizationObjectSchema, IAuthorizationObject } from '../types/authorizationTypes';

type AuthContextProps = {
  token?: IAuthorizationObject['token'];
  role?: IAuthorizationObject['role'];
  isLoggedIn: boolean;
  login: (token: IAuthorizationObject) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  token: '',
});

const retrieveStoredAuthorization = (): IAuthorizationObject | null => {
  const storedAuthorization = localStorage.getItem('authorization');

  if (!storedAuthorization) return null;

  const parsedAuthorization = AuthorizationObjectSchema.safeParse(JSON.parse(storedAuthorization));

  if (parsedAuthorization.success) {
    return parsedAuthorization.data;
  }
  console.error(parsedAuthorization.error);
  localStorage.removeItem('authorization');
  return null;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authorization, setAuthorization] = useState<IAuthorizationObject | null>(
    retrieveStoredAuthorization(),
  );

  const userIsLoggedIn = !!authorization;

  const logoutHandler = useCallback(() => {
    setAuthorization(null);
    localStorage.removeItem('authorization');
  }, []);

  const loginHandler = (authorization: IAuthorizationObject) => {
    localStorage.setItem('authorization', JSON.stringify(authorization));
    setAuthorization(authorization);
  };

  const contextValue: AuthContextProps = {
    isLoggedIn: userIsLoggedIn,
    token: authorization?.token,
    role: authorization?.role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
