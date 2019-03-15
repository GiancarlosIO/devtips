import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: '/graphql/',
  credentials: 'same-origin',
});

export default httpLink;
