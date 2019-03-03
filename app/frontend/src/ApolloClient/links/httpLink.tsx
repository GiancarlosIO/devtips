import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: '/graphql',
});

export default httpLink;
