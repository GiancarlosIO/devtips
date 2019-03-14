import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Signup from './SignUp';
import SignIn from './SignIn';

const Authentication: React.FunctionComponent<
  RouteComponentProps
> = (): React.ReactElement => (
  <div>
    <Router>
      <Signup path="signup" />
      <SignIn path="signin" />
    </Router>
  </div>
);

export default Authentication;
