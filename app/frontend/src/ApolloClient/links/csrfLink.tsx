import { ApolloLink } from 'apollo-link';

import getCookie from 'src/utils/getCookie';

const csrfTokenLink = new ApolloLink((operation, forward) => {
  const csrftoken = getCookie('csrftoken');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'X-CSRFToken': csrftoken,
    },
  }));

  return forward(operation);
});

export default csrfTokenLink;
