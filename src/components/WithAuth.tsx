import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../api/store';
import { RequireLoginMsg } from './RequireLogin';

export function withAuth<T>(WrappedComponent: ComponentType<T>) {
  const AuthenticatedComponent: React.FC<React.PropsWithChildren<T>> = (props) => {
    const auth = useSelector((state: RootState) => state.auth);
    if (!auth.isLoggedIn) {
      return <RequireLoginMsg />;
    }
    return <WrappedComponent {...props} />;
  }

  return AuthenticatedComponent;
}