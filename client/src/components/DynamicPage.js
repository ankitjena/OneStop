import React, {Component} from 'react';
import { Header, Button, Image } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Layout from './Layout';
import NavBar from './NavBar';
import First from './First';
import Feed from './Feed';

class DynamicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_name: '',
      bio: '',
      username: '',
      problems: []
    }
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    localStorage.removeItem('jwtToken');
    axios.post('http://localhost:8000/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      username: this.props.userdata.username,
      bio: this.props.userdata.bio,
      file_name: this.props.userdata.filename
    })
    this.fetchProblems(this.props.userdata.username)
  }

  fetchProblems(username) {
    axios.get('http://localhost:8000/api/problems/'+username)
      .then(res => {
        console.log(res.data);
        this.setState({
          problems: res.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if(this.props.userdata !== prevProps.userdata) {
      this.setState({
        username: this.props.userdata.username,
        bio: this.props.userdata.bio,
        file_name: this.props.userdata.filename
      })
      this.fetchProblems(this.props.userdata.username)

    }
  }

  render() {
    console.log(this.state);
    if (this.props.loggedIn == true){

      return (
        <div>
        <Layout>
          <NavBar curr="profile" />
          <Image src={`http://localhost:8000/user/image/${this.state.file_name}`} size="medium" rounded />
          <Header as="h2">Dynamic Page</Header>
          <Header as="h1">Welcome!!! </Header>
          <Header as="h1">{this.state.username}</Header>
          <Header as="h4">{this.state.bio}</Header>
          <p>This page was loaded asynchronously!!!</p>
          <Button color="red" onClick={this.logout}>LogOut</Button>
          {this.state.problems.map(problem => (
            <Feed problem={problem} key={problem._id} username={this.props.username}/>
          ))}
        </Layout>
      </div>
      );
  }
else {
  return ( <First />);
}
}
};

DynamicPage.propTypes = {
  userdata: PropTypes.object
}

export default DynamicPage;
