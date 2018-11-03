import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';

import { pullRight, h1 } from './layout.css';

const Layout = ({ children }) => {
  return (
    <Container>
      <Link to="/home">
        <Header as="h1" className={h1}>
          Issue Finder!
        </Header>
      </Link>
      {children}
      <Divider />
    </Container>
  );
};

export default Layout;
