import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Schema } from 'yup';

import { styled } from 'src/theme';
import { Container } from 'src/ui/Grid';
import Button from 'src/ui/Button';
import Input from '../ui/input';
import { ErrorMessage } from './Styles';

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

type AuthFormProps = {
  /**
   * @param {function} onSubmit - The function to run in the form component.
  */
  onSubmit(values: valueType): void;
  /**
  * @param {string} error - the general error to show bellow the submit button.
  */
  error?: string;
  /**
  * @param {boolean} buttonDisabled - Disables the button, usefull to no re-run the submit function if the mutations are loading.
  */
  buttonDisabled?: boolean;
  /**
  * @param {string} title - Customize the title of the form.
  */
  title: string;
}

/**
 * A reusable AuthForm component.
 */
const AuthForm: React.FunctionComponent<AuthFormProps> = ({
  onSubmit,
  error,
  buttonDisabled,
  title,
}) => {
  const [authSchema, setAuthSchema] = React.useState<any>(null);

  return (
    <CustomContainer>
        <Title>{title}</Title>
        <Formik<valueType>
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={authSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isValidating, isValid }) => (
            <FormStyled
              autoComplete="off"
              onMouseEnter={() => {
                import(/* webpackChunkName: "signupSchema-yup" */ './AuthFormSchema').then(
                  module => {
                    setAuthSchema(module.default as Schema<{ email: string; password: string }>);
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
                disabled={isValidating || !isValid || buttonDisabled}
              >
                Signup
              </ButtonStyled>
              {error && <ErrorMessage style={{ marginTop: 20 }}>{error}</ErrorMessage>}
            </FormStyled>
          )}
        </Formik>
      </CustomContainer>
  )
}

export default AuthForm;
