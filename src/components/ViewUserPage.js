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

    // handleNameChange(event){
    //     this.setState({name: event.target.value})
    //     console.log(this.state.name)
    // }
    
    render () {
        if(this.props.currentUser === window.location.pathname.split('/')[2]){
            return (
                <>
                    <h1>Your username is: {this.state.name}</h1>
                    {/* <textarea value={this.state.name} onChange={this.handleNameChange} /> */}
                    {/* <input type="text" value={this.state.name} onChange={this.handleNameChange} /> */}
                    <h1>User Contact Info: {this.state.contactInfo}</h1>
                    <h1>{this.state.profilePicture}</h1>
                    {/* {this.props.currentUser} */}
                </>
            )
        } else {
            return (
                <>
                    <h1>User Name: {this.state.name}</h1>
                    <h1>User Contact Info: {this.state.contactInfo}</h1>
                    <h1>{this.state.profilePicture}</h1>
                    {/* {this.props.currentUser} */}
                </>
            )
        }
    }
}

export default ViewUserPage;