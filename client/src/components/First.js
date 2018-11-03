import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Container, Divider } from 'semantic-ui-react';



import { pullRight, h1 } from './layout.css';

const First = ({ loggedIn}) => {
  console.log("loggedIn:",loggedIn);
  if(loggedIn) {
    return (
      <Redirect to ={{ pathname: '/home'}} />
    ) } else {
    return (
    <Container>
      <Link to="/login">
        <Header as="h1" className={h1}>
          LogIn!
        </Header>
      </Link>
      <Link to="/signup">
        <Header as="h1" className={h1}>
          SignUp!
        </Header>
      </Link>
      <Divider />
    </Container>
  )
}
};

export default First;
