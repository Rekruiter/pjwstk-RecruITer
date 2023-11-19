import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { AuthorizationObjectSchema, IAuthorizationObject } from '../types/authorizationTypes';
import instance from '../api/axios/axios';

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

const safeJSONParse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const retrieveStoredAuthorization = (): IAuthorizationObject | null => {
  const storedAuthorization = localStorage.getItem('authorization');

  if (!storedAuthorization) return null;

  const parsedAuthorization = AuthorizationObjectSchema.safeParse(safeJSONParse(storedAuthorization));

  if (parsedAuthorization.success) {
    return parsedAuthorization.data;
  }
  localStorage.removeItem('authorization');
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
  }, []);

  const loginHandler = (authorization: IAuthorizationObject) => {
    localStorage.setItem('authorization', JSON.stringify(authorization));
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
