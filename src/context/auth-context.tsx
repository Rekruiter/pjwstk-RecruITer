import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { AuthorizationObjectSchema, IAuthorizationObject } from '../types/authorizationTypes';
import instance from '../api/axios/axios';
import { safeJSONParse } from '../helpers';

type AuthContextProps = {
  name?: IAuthorizationObject['name'];
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
});

const retrieveStoredAuthorization = (): IAuthorizationObject | null => {
  const storedAuthorization = localStorage.getItem('authorization');
  const storedRole = localStorage.getItem('role');

  if (!storedAuthorization) return null;
  if (!storedRole) return null;

  const authorizationObject = safeJSONParse(storedAuthorization);
  const roleObject = safeJSONParse(storedRole);

  const parsedAuthorization = AuthorizationObjectSchema.safeParse({
    ...authorizationObject,
    role: roleObject,
  });
  if (parsedAuthorization.success) {
    return parsedAuthorization.data;
  }

  localStorage.removeItem('authorization');
  localStorage.removeItem('role');
  return null;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authorization, setAuthorization] = useState<IAuthorizationObject | null>(retrieveStoredAuthorization());

  const userIsLoggedIn = !!authorization;

  useLayoutEffect(() => {
    if (!authorization?.token) return;
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${authorization.token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [authorization]);

  const logoutHandler = useCallback(() => {
    setAuthorization(null);
    localStorage.removeItem('authorization');
    localStorage.removeItem('role');
  }, []);

  const loginHandler = (authorization: IAuthorizationObject) => {
    localStorage.setItem(
      'authorization',
      JSON.stringify({
        token: authorization.token,
        name: authorization.name,
      }),
    );
    localStorage.setItem('role', JSON.stringify(authorization.role));
    setAuthorization(authorization);
  };

  const contextValue: AuthContextProps = {
    isLoggedIn: userIsLoggedIn,
    token: authorization?.token,
    role: authorization?.role,
    name: authorization?.name,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
