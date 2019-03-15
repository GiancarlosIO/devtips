import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useMutation } from 'urql';

import AuthForm from '../Shared/AuthForm';
import { useUserContext } from 'src/contexts/UserContext';
import UserProtectedComponent from 'src/Shared/Redirects/UserProtectedComponent';

import GET_AUTH_TOKEN_MUTATION from '../graphql/authTokenMutation.graphql';

type AuthTokenResponse = {
  tokenAuth: {
    token: string;
  }
}

const SignIn: React.FunctionComponent<RouteComponentProps> = () => {
  const [errorMutation, setErrorMutation] = React.useState('');
  const [res, executeMutation] = useMutation<AuthTokenResponse>(GET_AUTH_TOKEN_MUTATION);
  const userContext = useUserContext();

  return (
    <UserProtectedComponent currentPath="signin" redirectTo="/">
      <AuthForm
        error={errorMutation}
        onSubmit={values => {
          executeMutation(values).then(response => {
            if (response.error) {
              console.log('error to get the auth token', response.error);
              setErrorMutation(response.error.message.replace(/\[GraphQL\]\s/, ''));
            } else if (response.data) {
              if (response.data.tokenAuth) {
                userContext.setUser({ email: values.email, token: response.data.tokenAuth.token });
              }
            }
          })
        }}
        title="Login to DevTips!"
        buttonDisabled={res.fetching}
      />
    </UserProtectedComponent>
  )
};

export default SignIn;
