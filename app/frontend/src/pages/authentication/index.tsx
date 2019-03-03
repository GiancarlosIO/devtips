import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Signup from './SignUp';

const Authentication: React.FunctionComponent<
  RouteComponentProps
> = (): React.ReactElement => (
  <div>
    <Router>
      <Signup path="signup" />
    </Router>
  </div>
);

export default Authentication;
