import * as React from 'react';
import { Router } from '@reach/router';
import { Provider, createClient } from 'urql';
import { hot } from 'react-hot-loader/root';

// apps/pages
import Authentication from 'src/pages/Authentication';
import Home from 'src/pages/Home';

// themes
import theme, { ThemeProvider, createGlobalStyle } from 'src/theme';

// contexts
import { UserContextProvider } from 'src/contexts/UserContext';

// utils / helpers
import getUserFromLocalStorage from 'src/utils/getUserFromLocalStorage';
// import getCookie from 'src/utils/getCookie';

const GlobalStyle = createGlobalStyle`
  html, body, * {
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
  }
`;

const client = createClient({
  url: '/graphql/',
  fetchOptions: () => {
    // const csrftoken = getCookie('csrftoken');
    const user = getUserFromLocalStorage();
    const headers = { Authorization: '', 'X-CSRFToken': '' };

    if (user) {
      headers.Authorization = `JWT ${user.token}`;
    } else {
      delete headers.Authorization;
    }

    // if (csrftoken) {
    //   headers['X-CSRFToken'] = csrftoken;
    // } else {
    //   delete headers['X-CSRFToken'];
    // }

    return {
      headers: {
        ...headers,
      },
    };
  },
});

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
