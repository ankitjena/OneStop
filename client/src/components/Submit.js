import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, Select, TextArea } from 'semantic-ui-react';
import First from './First';
import Layout from './Layout';
import NavBar from './NavBar';

class Submit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      subject: '',
      description: '',
      image: '',
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleSelect(event, value) {
    this.setState({
      category: value.value
    })
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

  resetForm() {
    console.log("form reset");
    document.getElementById('submitform').reset();
    this.setState ({
      category: '',
      subject: '',
      description: '',
      image: '',
      file: null
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.image);
    formData.append('category', this.state.category);
    formData.append('author', this.props.username)
    formData.append('subject', this.state.subject);
    formData.append('description', this.state.description);
    formData.append('filename', this.state.filename);
    for (var key of formData.entries()) {
      console.log(key[0],key[1]);
    }
    axios.post('http://localhost:8000/api/', formData, {
      headers : {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      alert('submitted');
      this.resetForm();
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    if(this.props.loggedIn == true) {
    console.log(this.props.loggedIn)
    const options = [{key: 'hc', value: 'Healthcare', text:'Healthcare'},
                      {key: 'rs', value: 'Road Safety', text:'Road Safety'},
                    {key: 'el', value: 'Electricity', text:'Electricity'}]
    return (
      <Layout>
        <NavBar curr="submit" />
        <Form id="submitform" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Image:</label>
            <input type="file" onChange={this.handleFileChange}/>
            <img src={this.state.file} height="500" width="500"/>
          </Form.Field>
          <Form.Field inline>
            <label>Category</label>
            <Select name="category" placeholder="Select the category" options={options} onChange={this.handleSelect}/>
          </Form.Field>
          <Form.Field>
            <label>Subject</label>
            <input name="subject" placeholder="subject" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea name="description" placeholder="Tell us more" onChange={this.handleChange}/>
          </Form.Field>

          <Button type='submit'>Submit</Button>
        </Form>
      </Layout>
    )
  }
  else {
    {
      console.log(this.props.loggedIn)
      return(
        <First />
      )
    }
  }
  }
}

export default Submit;
