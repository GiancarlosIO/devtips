import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
  // get the authentication local from the localstorage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so Httplink can read them

  return {
    ...headers,
    Authorization: token ? `JWT ${token}` : '',
  };
});

export default authLink;
