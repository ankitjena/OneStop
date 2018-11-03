import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './Home';
import DynamicPage from './DynamicPage';
import Submit from './Submit';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import LoginForm from './Login';
import Signup from './SignUp'
import First from './First';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn : false,
      username : null,
      data : {}
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    let token = localStorage.getItem('jwtToken');
    axios.get('http://localhost:8000/user/' + token).then(response => {
      console.log('Get user response: ')
      //response = decoded object {username:'username'}
      console.log(response.data, "this")
      if (response.data.username) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.username,
          data: response.data
        })
      } else {
        console.log('Get user: no user');
        console.log(response.data);
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
  console.log(this.state);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render = {() => <First loggedIn={this.state.loggedIn} /> } />
          <Route exact path="/home" render = {() => <Home loggedIn={this.state.loggedIn} username={this.state.username}/> } />
          <Route exact path="/profile" render ={ () => <DynamicPage updateUser={this.updateUser} loggedIn={this.state.loggedIn} userdata={this.state.data}/> } />
          <Route exact path="/submit" render = { () => <Submit loggedIn={this.state.loggedIn} username={this.state.username} /> } />
          <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
          <Route path="/signup" render={() => <Signup/>} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
  }
};

export default App;
