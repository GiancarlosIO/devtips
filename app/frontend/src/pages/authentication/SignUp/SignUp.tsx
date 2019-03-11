/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import { useMutation } from 'urql';
import { Formik, Form, Field } from 'formik';
import { RouteComponentProps } from '@reach/router';

import { styled } from 'src/theme';
import { Container } from 'src/ui/Grid';
import Button from 'src/ui/Button';
import Input from '../ui/input';
// import SignupSchema from './SignupSchema';
import { ErrorMessage } from './Styles';

import CREATE_USER_MUTATION from './graphql/createUserMutation.graphql';

// const CREATE_USER_MUTATION = `
//   mutation createUser($email: String!, $password: String!){
//     createUser(userData: {
//       email: $email,
//       password: $password
//     }) {
//       user {
//         id
//         email
//       }
//     }
//   }
// `;

// interface SignUpProps extends RouteComponentProps {}

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
  data: {
    createUser: {
      user: {
        email: string;
        id: string;
      };
    };
  };
};

const Signup: React.FunctionComponent<
  RouteComponentProps
> = (): React.ReactElement => {
  const [signupSchema, setSignupSchem] = React.useState(null);
  const [res, executeMutation] = useMutation<UserMutationResponse>(
    CREATE_USER_MUTATION,
  );

  if (res.error) {
    return <h1>Error!</h1>;
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
            // we need to run another mutation here
            console.log({ response });
            console.log({ response });
          });
        }}
      >
        {({ errors, touched, isValidating, isValid }) => (
          <FormStyled
            autoComplete="off"
            onMouseEnter={() => {
              import(/* webpackChunkName: "signupSchema-yup" */ './SignupSchema').then(
                module => {
                  setSignupSchem(module.default);
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
          </FormStyled>
        )}
      </Formik>
    </CustomContainer>
  );
};

export default Signup;
