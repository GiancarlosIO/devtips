import * as React from 'react';

import { Container } from 'src/ui/Grid/Container';
import MainMenu from './components/MainMenu';

const MainLayout: React.FunctionComponent = ({ children }) => (
  <Container>
    <MainMenu />
    {children}
    <h2>Footer</h2>
  </Container>
);

export default MainLayout;
