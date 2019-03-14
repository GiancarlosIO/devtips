/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import { useMutation } from 'urql';
import { RouteComponentProps } from '@reach/router';

import { useUserContext } from 'src/contexts/UserContext';

import AuthForm from '../Shared/AuthForm';
import UserProtectedComponent from 'src/Shared/Redirects/UserProtectedComponent';

import CREATE_USER_MUTATION from './graphql/createUserMutation.graphql';
import GET_AUTH_TOKEN_MUTATION from './graphql/authTokenMutation.graphql';

type UserMutationResponse = {
  createUser: {
    user: {
      email: string;
      id: string;
    };
  };
};

type AuthTokenMutationResponse = {
  tokenAuth: {
    token: string;
  };
};

const Signup: React.FunctionComponent<
  RouteComponentProps
> = (): React.ReactElement => {
  const userContext = useUserContext();
  const [_, executeTokenMutation] = useMutation<AuthTokenMutationResponse>(
    GET_AUTH_TOKEN_MUTATION,
  );
  const [res, executeMutation] = useMutation<UserMutationResponse>(
    CREATE_USER_MUTATION,
  );
  const [errorMutations, setErrorMutation] = React.useState('');
  React.useEffect(() => {
    if (res.fetching) {
      setErrorMutation('');
    }
  }, [res.fetching]);

  return (
    <UserProtectedComponent redirectTo="/" currentPath="signup">
      <AuthForm
        error={errorMutations}
        onSubmit={values => {
          executeMutation(values).then(response => {
            // we need to run another mutation here to get the auth token
            if (!response.error) {
              executeTokenMutation(values).then(authResponseMutation => {
                if (authResponseMutation.error) {
                  console.log('Error to get the auth token', authResponseMutation.error );
                  setErrorMutation(authResponseMutation.error.message.replace(/\[GraphQL\]\s/, ''));
                } else if (authResponseMutation.data) {
                  if (authResponseMutation.data.tokenAuth)
                  userContext.setUser({ email: values.email, token: authResponseMutation.data.tokenAuth.token })
                }
              });
            } else {
              console.log('Error to createUser', response.error.message);
              setErrorMutation(response.error.message.replace(/\[GraphQL\]\s/, ''));
            }
          }).catch(error => {
            console.log('Error to create user', error);
          });
        }}
        title="Create an account!"
        buttonDisabled={res.fetching}
      />
    </UserProtectedComponent>
  );
};

export default Signup;
