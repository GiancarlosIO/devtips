import { onError } from 'apollo-link-error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) => {
      console.error(`
        [Graphql Error]: Message: ${message}, Location: ${location}, Path: ${path}
      `);
    });
  }
  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }
});

export default errorLink;
