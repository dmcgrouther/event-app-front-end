import React, { Component } from 'react';
import axios from 'axios';

class ViewUserPage extends Component {
    state = {
        name: '',
        contactInfo: '',
        profilePicture: '',
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`)
          .then((res) => {
            this.setState({
                name: res.data.data.name,
                contactInfo: res.data.data.contactInfo,
            })
            console.log(res)
          })
          .catch((err) => console.log(err));
    }

    render () {
        return (
            <>
                <h1>{this.state.name}</h1>

                <h1>{this.state.contactInfo}</h1>

                <h1>{this.state.profilePicture}</h1>
            </>
        )
    }
}

export default ViewUserPage;