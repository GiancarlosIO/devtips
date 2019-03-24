import * as React from 'react';
import { styled } from 'src/theme';

import { TipType } from '../types';

const Card = styled.div`
  padding: 24px 12px;
  color: ${props => props.theme.colors.whiteblue};
  font-size: 16px;
  display: grid;
  grid-template-columns: 40px auto;
  grid-template-rows: auto auto;
  grid-gap: 8px;
  p {
    margin: 0;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 0 0 16px 0;
`;

const User = styled.p`
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.whiteblue};
  font-weight: lighter;
  grid-column: 1 / span 1;
`;

const Description = styled.div`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
`;

const Tip: React.FunctionComponent<TipType> = ({
  user,
  slug,
  title,
  description,
}) => (
  <Card>
    <User>By {user.email}</User>
    <Description>
      <Title>{title}</Title>
      <p>{description}</p>
    </Description>
  </Card>
);

export default Tip;
