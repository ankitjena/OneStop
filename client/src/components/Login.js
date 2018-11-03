import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Select, TextArea } from 'semantic-ui-react';
import Layout from './Layout';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('http://localhost:8000/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                localStorage.setItem('jwtToken', response.data.token);
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        data: response.data.details
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/profile'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
      if (this.state.redirectTo) {
        return <Redirect to = {{ pathname: this.state.redirectTo}} />
      }
      else
      {
        return(
        <Layout>
          <h1> Login </h1>
          <Form id="loginform" onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>UserName</label>
              <input name="username" placeholder="username" value = {this.state.username} onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Field>

            <Button type='submit'>Login</Button>
          </Form>
        </Layout>
      )
    }
    }
  }

  export default LoginForm
