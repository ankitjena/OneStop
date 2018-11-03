import React, {Component} from 'react';
import ReactDOM from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import Feed from './Feed';
import Layout from './Layout';
import NavBar from './NavBar';
import First from './First';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problems : []
    }
  }

  componentDidMount() {
    console.log(this.props.username);
    axios.get('http://localhost:8000/api/problems', {
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(problems => {
      this.setState({problems : problems.data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    console.log(this.props.loggedIn);
    if(this.props.loggedIn == true){
    return(
      <Layout>
        <NavBar curr="feed" />
        {this.state.problems.map(problem => (
          <Feed problem={problem} key={problem._id} username={this.props.username}/>
        ))}
      </Layout>
    )
  }
  else {
      console.log(this.props.loggedIn)
      return(
        <div>
        <First />
        </div>
      )
  }
  }
}

export default Home;
