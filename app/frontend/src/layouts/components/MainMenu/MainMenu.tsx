import * as React from 'react';
import { styled, css } from 'src/theme/';
import { useUserContext } from 'src/contexts/UserContext';

import Search from './Search';

const Container = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid rgba(83, 24, 184, 0.27);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const Right = styled.div`
  text-align: right;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  background-color: ${props => props.theme.colors.mainColor};
  width: fit-content;
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
`;

const Signout = styled.button`
  background-color: transparent;
  margin-left: 8px;
`;

const MainMenu: React.FunctionComponent = () => {
  const userContext = useUserContext();

  const onSignout = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container>
      <Left>
        <Logo>DevTips!</Logo>
        <Search />
      </Left>
      <Right>
        {userContext.user ? (
          <div>
            <span>Hi {userContext.user.email}</span>
            <Signout onClick={onSignout}>Signout</Signout>
          </div>
        ) : (
          <React.Fragment>
            <a href="/auth/signup">Signup</a>
            <a
              css={css`
                margin-left: 20px;
              `}
              href="/auth/signin"
            >
              Signin
            </a>
          </React.Fragment>
        )}
      </Right>
    </Container>
  );
};

export default MainMenu;
