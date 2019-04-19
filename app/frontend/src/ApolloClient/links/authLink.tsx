import { setContext } from 'apollo-link-context';

import getUserFromLocalStorage from 'src/utils/getUserFromLocalStorage';

const authLink = setContext((_, { headers }) => {
  const user = getUserFromLocalStorage();
  const extraHeaders = { Authorization: '' };

  if (user) {
    extraHeaders.Authorization = `JWT ${user.token}`;
  }

  // we don't need this because we are disabling the csrf to all graphql requests
  // if (csrftoken) {
  //   headers['X-CSRFToken'] = csrftoken;
  // } else {
  //   delete headers['X-CSRFToken'];
  // }

  return {
    headers: {
      ...headers,
      ...extraHeaders,
    },
  };
});

export default authLink;
