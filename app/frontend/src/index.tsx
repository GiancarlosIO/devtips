import 'unfetch/polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { ApolloProvider } from 'react-apollo';

// utisl
import ApolloClient from './ApolloClient';

// apps/pages
import Authentication from './pages/authentication';

const App: React.FunctionComponent = (): React.ReactElement => (
  <ApolloProvider client={ApolloClient}>
    <Router>
      <Authentication path="/auth/*" />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.querySelector('#app'));
