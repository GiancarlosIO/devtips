import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// links
import httpLink from './links/httpLink';
import authLink from './links/authLink';
import errorLink from './links/errorLink';

const Client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
});

export default Client;
