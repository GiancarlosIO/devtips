import * as React from 'react';
import { styled, css } from 'src/theme/';
import { useUserContext } from 'src/contexts/UserContext';

const Container = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.whiteblue};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const Right = styled.div`
  text-align: right;
`;

const Left = styled.div``;

const Logo = styled.div`
  background-color: ${props => props.theme.colors.mainColor};
  width: fit-content;
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
`;

const MainMenu: React.FunctionComponent = () => {
  const userContext = useUserContext();

  return (
    <Container>
      <Left>
        <Logo>DevTips!</Logo>
      </Left>
      <Right>
        {userContext.user ? (
          <span>Hi {userContext.user.email}</span>
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
