import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { Provider, createClient } from 'urql';
import { hot } from 'react-hot-loader/root';

// apps/pages
import Authentication from 'src/pages/authentication';

// themes
import theme, { ThemeProvider, createGlobalStyle } from 'src/theme';

// contexts
import { UserContextProvider } from 'src/contexts/UserContext';

const GlobalStyle = createGlobalStyle`
  html, body, * {
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
  }
`;

const client = createClient({
  url: '/graphql/',
});

const Home: React.FunctionComponent<RouteComponentProps> = () => (
  <h1>HomePage</h1>
)

const App: React.FunctionComponent = (): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <Provider value={client}>
      <UserContextProvider>
        <div>
          <Router>
            <Authentication path="/auth/*" />
            <Home path="/" />
          </Router>
          <GlobalStyle />
        </div>
      </UserContextProvider>
    </Provider>
  </ThemeProvider>
);

export default hot(App);
