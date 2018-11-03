import React, {Component} from 'react';

import { Header, Image, Divider, Label, Icon} from 'semantic-ui-react';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { img:''}
  }

componentDidMount() {
  fetch(`https://graph.facebook.com/${this.props.data.id}?fields=images&access_token=${this.props.access}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        img: json.images[0].source
      })
    })
}

render() {
  return(
      <div>
        <img src={this.state.img} height='200px' width='200px' />
        <br />
        <b>{}</b>
        <p>{}</p>
        <Divider />
      </div>
  )
}
}

export default Feed;
