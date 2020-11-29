import React, { Component } from 'react';
import axios from 'axios';
//https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402

class ViewUserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            contactInfo: '',
            profilePicture: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContactInfoChange = this.handleContactInfoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleNameChange(event){
        this.setState({name: event.target.value})
        console.log(this.state.name)
    }

    handleContactInfoChange(event){
        this.setState({contactInfo: event.target.value})
        console.log(this.state.contactInfo)
    }
    
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.state.contactInfo);
        axios.put(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`, {
            name: this.state.name,
            contactInfo: this.state.contactInfo
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error)
        });
    }

    deleteYourAccount(event){
        // event.preventDefault();
        console.log('delete delete!')
        axios.delete(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`)
        .then(res => {
            console.log(res);
            this.props.setCurrentUser('');
            window.location = '/accountdeleted';
        }).catch(err => console.log(err));
    }

    render () {
        if(this.props.currentUser === window.location.pathname.split('/')[2]){
            return (
                <>
                    <h1>Your username is: {this.state.name}</h1>
                    <h1>Your contact information is: {this.state.contactInfo}</h1>
                    <h4>If you would like to edit your username and contact information (not required), you may do so below.</h4>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        User Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Contact Info:
                        <input type="text" value={this.state.contactInfo} onChange={this.handleContactInfoChange} />
                    </label>
                    <br />
                    <input type="submit" value="Save Changes" />
                    </form>
                    <br />
                    <br />
                    <h4>If you would like to delete your account, you can do so by clicking the button below.</h4>
                    {/* <button onClick={this.deleteYourAccount}>Delete My Account</button> */}

                    <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete your account?')) this.deleteYourAccount(event) } }>
                        Delete My Account
                    </button>
                    
                    {/* <h4>Are you sure you want to delete your accout? Click below to do so.</h4>
                    <button onClick={this.confirmAccountDeletion}>Yes, I want to delete my account.</button> */}
                </>
              );
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