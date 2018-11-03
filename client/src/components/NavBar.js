import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

const NavBar = ({curr}) => {
  return (
      <Menu tabular>
        <Link to="/home"><Menu.Item name='feed' active={curr === 'feed'}>Feed</Menu.Item></Link>
        <Link to="/profile"><Menu.Item name='profile' active={curr === 'profile'}>Profile</Menu.Item></Link>
        <Link to="/submit"><Menu.Item name='submit' active={curr === 'submit'}>Submit</Menu.Item></Link>
      </Menu>
  );
};

export default NavBar;
