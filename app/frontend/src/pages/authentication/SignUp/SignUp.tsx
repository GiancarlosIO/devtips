/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from '@reach/router';

import { useUserContext } from 'src/contexts/UserContext';

import UserProtectedComponent from 'src/Shared/Redirects/UserProtectedComponent';

import parseGraphqlErrors from 'src/utils/parseGraphqlErrors';
import AuthForm from '../Shared/AuthForm';

import CREATE_USER_MUTATION from '../graphql/createUserMutation.graphql';
import GET_AUTH_TOKEN_MUTATION from '../graphql/authTokenMutation.graphql';

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
  // const [_, executeTokenMutation] = useMutation<AuthTokenMutationResponse>(
  //   GET_AUTH_TOKEN_MUTATION,
  // );
  // const [res, executeMutation] = useMutation<UserMutationResponse>(
  //   CREATE_USER_MUTATION,
  // );
  const [errorMutations, setErrorMutation] = React.useState<string[]>([]);

  return (
    <Mutation<AuthTokenMutationResponse> mutation={GET_AUTH_TOKEN_MUTATION}>
      {(runAuthTokenMutation, { loading: loadingAuthTokemMutation }) => (
        <Mutation<UserMutationResponse> mutation={CREATE_USER_MUTATION}>
          {(runCreateUserMutation, { loading: loadingCreateUserMutation }) => (
            <UserProtectedComponent redirectTo="/" currentPath="signup">
              <AuthForm
                graphqlErrors={errorMutations}
                onSubmit={async values => {
                  await setErrorMutation([]);
                  runCreateUserMutation({ variables: values })
                    .then(({ data }) => {
                      // we need to run another mutation here to get the auth token
                      if (data) {
                        if (!data.error) {
                          runAuthTokenMutation({
                            variables: values,
                          })
                            .then(authResponseMutation => {
                              console.log({ authResponseMutation });
                              if (
                                authResponseMutation &&
                                authResponseMutation.data
                              ) {
                                if (authResponseMutation.data.tokenAuth) {
                                  userContext.setUser({
                                    email: values.email,
                                    token:
                                      authResponseMutation.data.tokenAuth.token,
                                  });
                                }
                              }
                            })
                            .catch(error => {
                              console.log('Error to get the auth token', error);
                              setErrorMutation(parseGraphqlErrors(error));
                            });
                        } else {
                          console.log('Error to createUser', data.error);
                          setErrorMutation(parseGraphqlErrors(data.error));
                        }
                      }
                    })
                    .catch(error => {
                      console.log('Error to create user', error);
                      setErrorMutation(parseGraphqlErrors(error));
                    });
                }}
                title="Create an account!"
                buttonDisabled={
                  loadingAuthTokemMutation || loadingCreateUserMutation
                }
                submitButtonText="Signup"
              />
            </UserProtectedComponent>
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

export default Signup;
