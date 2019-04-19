import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Mutation } from 'react-apollo';

import { useUserContext } from 'src/contexts/UserContext';
import UserProtectedComponent from 'src/Shared/Redirects/UserProtectedComponent';
import parseGraphqlErrors from 'src/utils/parseGraphqlErrors';
import AuthForm from '../Shared/AuthForm';

import GET_AUTH_TOKEN_MUTATION from '../graphql/authTokenMutation.graphql';

type AuthTokenResponse = {
  tokenAuth: {
    token: string;
  };
};

const SignIn: React.FunctionComponent<RouteComponentProps> = () => {
  const userContext = useUserContext();
  const [errorFormated, setErrorFormated] = React.useState<string[]>([]);

  return (
    <Mutation<AuthTokenResponse, { email: string; password: string }>
      mutation={GET_AUTH_TOKEN_MUTATION}
    >
      {(mutate, { loading }) => (
        // UserProtectedComponent will redirect to home page if an user exists
        <UserProtectedComponent currentPath="signin" redirectTo="/">
          <AuthForm
            graphqlErrors={errorFormated}
            onSubmit={values => {
              mutate({ variables: values })
                .then(async response => {
                  await setErrorFormated([]);
                  if (response) {
                    if (response.data.errors) {
                      setErrorFormated(
                        parseGraphqlErrors(response.data.errors),
                      );
                    } else if (response.data) {
                      if (response.data.tokenAuth.token) {
                        // set the user, so the UserProtectedComponent can redirecto to home page
                        userContext.setUser({
                          email: values.email,
                          token: response.data.tokenAuth.token,
                        });
                      }
                    }
                  }
                })
                .catch(error => {
                  // console.log({ error });
                  setErrorFormated(parseGraphqlErrors(error));
                });
            }}
            title="Login to DevTips!"
            buttonDisabled={loading}
            submitButtonText="Signin"
          />
        </UserProtectedComponent>
      )}
    </Mutation>
  );
};

export default SignIn;
