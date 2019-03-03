/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

interface SignUpProps extends RouteComponentProps {}

const Signup: React.FunctionComponent<SignUpProps> = (): React.ReactElement => (
  <div>
    <h1>Create an account!</h1>
    <form>
      <input
        type="email"
        placeholder="Email"
        autoFocus
        data-cy="signup-email"
      />
    </form>
  </div>
);

export default Signup;
