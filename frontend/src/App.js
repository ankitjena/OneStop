import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import Feed from './components/Feed'

class App extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: '', id: '', data:[], access: '', friends: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null, access: ''})
    };

    onFailure = (error) => {
        alert(error);
    };

    // twitterResponse = (response) => {
    //     const token = response.headers.get('x-auth-token');
    //     response.json().then(user => {
    //         if (token) {
    //             this.setState({isAuthenticated: true, user, token});
    //         }
    //     });
    // };

    // getUser() {
    //   let token = localStorage.getItem('jwtToken');
    //   axios.get('http://localhost:8000/user/' + token).then(response => {
    //     console.log('Get user response: ')
    //     //response = decoded object {username:'username'}
    //     console.log(response.data, "this")
    //     if (response.data.username) {
    //       console.log('Get User: There is a user saved in the server session: ')
    //
    //       this.setState({
    //         loggedIn: true,
    //         username: response.data.username,
    //         data: response.data
    //       })
    //     } else {
    //       console.log('Get user: no user');
    //       console.log(response.data);
    //       this.setState({
    //         loggedIn: false,
    //         username: null
    //       })
    //     }
    //   })
    // }

    facebookResponse = (response) => {
        console.log(response.accessToken);
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        console.log(tokenBlob);
        fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
            const token = r.headers.get('x-auth-token');
            console.log(token);
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token, access: response.accessToken})
                }
            })
        })

        fetch(`https://graph.facebook.com/me?fields=photos&access_token=${response.accessToken}`)
          .then(res => res.json())
          .then(json => {
            // console.log(json.photos.data);
            let data = json.photos.data
            this.setState({data: data})
            console.log(this.state.data);
          })

        fetch(`https://graph.facebook.com/me?fields=friends&access_token=${response.accessToken}`)
          .then(res => res.json())
          .then(json => {
            this.setState({friends: json.friends.summary.total_count})
            console.log(json.friends.summary.total_count);
          })
    };

    // googleResponse = (response) => {
    //     const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    //     const options = {
    //         method: 'POST',
    //         body: tokenBlob,
    //         mode: 'cors',
    //         cache: 'default'
    //     };
    //     fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
    //         const token = r.headers.get('x-auth-token');
    //         r.json().then(user => {
    //             if (token) {
    //                 this.setState({isAuthenticated: true, user, token})
    //             }
    //         });
    //     })
    // };

    render() {
    let feed = !!this.state.isAuthenticated ? this.state.data.map((data,key) => (
                                                  <Feed data={data} key={key} access={this.state.access}/>
                                                  )) : ''
    let content = !!this.state.isAuthenticated ?
              (
                <div>
                    <div>
                        <p>Total no. of friends: {this.state.friends}</p>
                        {feed}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>

                    <FacebookLogin
                        appId={config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />

                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;
