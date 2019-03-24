import * as React from 'react';

import { Container } from 'src/ui/Grid/Container';
import MainMenu from './components/MainMenu';

const MainLayout: React.FunctionComponent = ({ children }) => (
  <React.Fragment>
    <MainMenu />
    <Container>{children}</Container>
    <h2>Footer</h2>
  </React.Fragment>
);

export default MainLayout;
