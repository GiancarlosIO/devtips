import * as React from 'react';
import { Redirect } from '@reach/router';

import { useUserContext } from 'src/contexts/UserContext';

type UserPublicComponentProps = {
  children: React.ReactNode;
  currentPath: string;
  redirectTo: string;
};

/**
 * Redirects to redirectTo prop if the user is authenticated
 * @param currentPath - the current router path.
 * @param redirectTo - The route to redirect if the user is authenticated.
 */
const UserPublicComponent: React.FunctionComponent<UserPublicComponentProps> = ({
  children,
  currentPath,
  redirectTo,
}) => {
  const userContext = useUserContext();

  if (userContext.user.email && userContext.user.token) {
    return <Redirect noThrow from={currentPath} to={redirectTo} />
  }

  return <div>{children}</div>;
}

export default UserPublicComponent;
