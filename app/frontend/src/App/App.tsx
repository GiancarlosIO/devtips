import * as React from 'react';
import { Router } from '@reach/router';
import { Provider, createClient } from 'urql';
import { hot } from 'react-hot-loader/root';

// apps/pages
import Authentication from 'src/pages/authentication';

// themes
import theme, { ThemeProvider, createGlobalStyle } from 'src/theme';

const GlobalStyle = createGlobalStyle`
  html, body, * {
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
  }
`;

const client = createClient({
  url: '/graphql/',
});

const App: React.FunctionComponent = (): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <Provider value={client}>
      <div>
        <Router>
          <Authentication path="/auth/*" />
        </Router>
        <GlobalStyle />
      </div>
    </Provider>
  </ThemeProvider>
);

export default hot(App);
