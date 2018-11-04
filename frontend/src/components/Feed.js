import React, {Component} from 'react';

import { Header, Image, Divider, Label, Icon} from 'semantic-ui-react';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = { img:''}
  }

  getDate(date) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let arr = date.split('-')
    let newDate = `${arr[2].slice(0,2)} ${months[parseInt(arr[1]) - 1]} ${arr[0]}`
    return newDate
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
  let date = this.getDate(this.props.data.created_time);
  return(
      <div className="col-lg-4">
        <p>{date}</p>
        <img src={this.state.img} height='400px' width='400px' />
        <br />
        <p>{this.props.data.name}</p>
        <hr width="500px" />
      </div>
  )
}
}

export default Feed;
