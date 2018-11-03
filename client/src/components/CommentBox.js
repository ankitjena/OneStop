import React, {Component} from 'react';
import axios from 'axios';
import CommentList from './CommentList';

import { Comment, Button, Form } from 'semantic-ui-react';

class CommentBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      comments : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    console.log(this.props.comments);
    this.setState({
      comments: this.props.comments
    })
    console.log(this.state.comments);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  addComment(e) {
    e.preventDefault();
    const data = {
      author: this.props.username,
      text: this.state.text
    }
    console.log(data);
    this.state.comments.push(data);
    this.setState({
      comments: this.state.comments
    })
    console.log(this.state.comments);
    let url = "http://localhost:8000/api/problems/comment/" + this.props.id;
    axios.post(url, data)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render () {
    return (
    <Comment.Group>
      {this.state.comments.map((comment, key) => (
      <CommentList comment={comment} key={key} />
    ))}
      <Form reply>
        <Form.TextArea onChange={this.handleChange} />
        <Button content="Add a Comment" labelPosition='left' icon='edit' onClick={this.addComment} primary />
      </Form>
    </Comment.Group>
    )
  }
}

export default CommentBox;
