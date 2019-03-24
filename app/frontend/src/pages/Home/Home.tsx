import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from 'urql';

import MainLayout from 'src/layouts/MainLayout';
import GET_TIPS_QUERY from './graphql/getTips.graphql';

type UserType = {
  email: string;
};

type TipType = {
  user: UserType;
  id: string;
  slug: string;
  title: string;
};

type QueryResponse = {
  tips: TipType[];
};

const Home: React.FunctionComponent<RouteComponentProps> = () => {
  const [{ fetching, error, data }] = useQuery<QueryResponse>({
    query: GET_TIPS_QUERY,
  });

  const render = () => {
    if (fetching || !data) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>An error has ocurred - {error}</h2>;
    }

    return data.tips.map(tip => <p key={tip.id}>{tip.title}</p>);
  };

  return <MainLayout>{render()}</MainLayout>;
};

export default Home;
