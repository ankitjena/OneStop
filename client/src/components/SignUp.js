import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Select, TextArea } from 'semantic-ui-react';
import Layout from './Layout';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			image:'',
			bio:'',
			file:null

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleFileChange = this.handleFileChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0]
    })
  }

	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()
		const formData = new FormData();
		formData.append('file', this.state.image);
		formData.append('bio', this.state.bio);
		formData.append('username', this.state.username);
		formData.append('password', this.state.password);
		formData.append('filename', this.state.filename);
		//request to server to add a new username/password
		axios.post('http://localhost:8000/user/signup', formData, {
      headers : {
        'Content-Type': 'application/json'
      }
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}

render() {
	if (this.state.redirectTo) {
		return <Redirect to = {{ pathname: this.state.redirectTo }} />
	}
	else {
  return (
    <Layout>
      <h1> SignUp </h1>
      <Form id="loginform" onSubmit={this.handleSubmit}>
				<Form.Field>
          <label>Upload Image</label>
          <input name="file" type="file" placeholder="upload an Image.."  onChange={this.handleFileChange}/>
					<img src={this.state.file} height="500" width="500"/>
        </Form.Field>
				<Form.Field>
          <label>UserName</label>
          <input name="username" placeholder="username" value = {this.state.username} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input name="password" type="password" placeholder="confirm password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Field>
				<Form.Field>
          <label>Bio:</label>
          <input name="bio" type="text" placeholder="add bio.." value={this.state.bio} onChange={this.handleChange}/>
        </Form.Field>

        <Button type='submit'>SignUp</Button>
      </Form>
    </Layout>
  )
}
}

}

export default Signup
