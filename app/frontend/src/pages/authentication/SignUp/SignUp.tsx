/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import { useMutation } from 'urql';
import { Formik, Form, Field } from 'formik';
import { Redirect } from '@reach/router'
import { RouteComponentProps } from '@reach/router';
import { Schema } from 'yup';

import { useUserContext } from 'src/contexts/UserContext';

import { styled } from 'src/theme';
import { Container } from 'src/ui/Grid';
import Button from 'src/ui/Button';
import Input from '../ui/input';
// import SignupSchema from './SignupSchema';
import { ErrorMessage } from './Styles';

import CREATE_USER_MUTATION from './graphql/createUserMutation.graphql';
import GET_AUTH_TOKEN_MUTATION from './graphql/authTokenMutation.graphql';

const CustomContainer = styled(Container)`
  grid-template-columns: auto 500px auto;
  grid-template-rows: 80px auto;
`;

const Title = styled.h1`
  text-align: center;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

const FormStyled = styled(Form)`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 16px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 24px;
`;

type valueType = {
  email: string;
  password: string;
};

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
  const [signupSchema, setSignupSchem] = React.useState<any>(null);
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

  if (userContext.user.email && userContext.user.token) {
    return (
      <Redirect noThrow from="signup" to="/" />
    )
  }

  return (
    <CustomContainer>
      <Title>Create an account!</Title>
      <Formik<valueType>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={signupSchema}
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
      >
        {({ errors, touched, isValidating, isValid }) => (
          <FormStyled
            autoComplete="off"
            onMouseEnter={() => {
              import(/* webpackChunkName: "signupSchema-yup" */ './SignupSchema').then(
                module => {
                  setSignupSchem(module.default as Schema<{ email: string; password: string }>);
                },
              );
            }}
          >
            <input type="hidden" autoComplete="off" />
            <FieldWrapper>
              <Field
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email"
                    autoComplete="off"
                    data-cy="signup-email"
                  />
                )}
              />
              {errors.email && touched.email ? (
                <ErrorMessage>{errors.email}</ErrorMessage>
              ) : null}
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    data-cy="signup-password"
                  />
                )}
              />
              {errors.password && touched.password ? (
                <ErrorMessage>{errors.password}</ErrorMessage>
              ) : null}
            </FieldWrapper>
            <ButtonStyled
              type="submit"
              disabled={isValidating || !isValid || res.fetching}
            >
              Signup
            </ButtonStyled>
            {errorMutations && <ErrorMessage style={{ marginTop: 20 }}>{errorMutations}</ErrorMessage>}
          </FormStyled>
        )}
      </Formik>
    </CustomContainer>
  );
};

export default Signup;
