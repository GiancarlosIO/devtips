import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Query } from 'react-apollo';

import { styled } from 'src/theme';
import MainLayout from 'src/layouts/MainLayout';
import GET_TIPS_QUERY from './graphql/getTips.graphql';

import { TipType } from './types';
import Tip from './components/Tip';

const TipList = styled.div`
  background-color: ${props => props.theme.colors.innerBackgroundColor};
  border: 1px solid ${props => props.theme.colors.whiteblue};
  border-radius: 8px;
  & > div {
    &:not(:first-child) {
      border-top: 1px solid ${props => props.theme.colors.whiteblue};1
    }
  }
`;

type QueryData = {
  tips: TipType[];
};

const Home: React.FunctionComponent<RouteComponentProps> = () => (
  <MainLayout>
    <Query<QueryData> query={GET_TIPS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <h2>Loading...</h2>;
        }
        if (error) {
          return <h2>An error has ocurred - {error}</h2>;
        }

        return (
          <div>
            <TipList>
              {data.tips.map(tip => (
                <Tip {...tip} key={tip.id} />
              ))}
            </TipList>
          </div>
        );
      }}
    </Query>
  </MainLayout>
);

export default Home;
