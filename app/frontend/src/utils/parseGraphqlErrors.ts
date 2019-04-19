import { ApolloError } from 'apollo-client';

const parseGraphqlErrors = (graphqlError: ApolloError): string[] => {
  if (graphqlError.graphQLErrors) {
    return graphqlError.graphQLErrors.map(error => error.message);
  }
  return [];
};

export default parseGraphqlErrors;