import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditUserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            contactInfo: '',
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
        })
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

    render() {
        if(this.props.currentUser === window.location.pathname.split('/')[2]){
            return(
                <>
                    <h1>You may edit your information below</h1>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        User Name:
                        <br />
                        <input type="text" value={this.state.name} required={true} onChange={this.handleNameChange} />
                    </label>
                    <br />
                    <label>
                        Contact Info:
                        <br />
                        <input type="text" value={this.state.contactInfo} onChange={this.handleContactInfoChange} />
                    </label>
                    <br />
                    <input type="submit" value="Save Changes" />
                    </form>
                    <p>Click <Link to={`/users/${window.location.pathname.split('/')[2]}`}>here</Link> to return to your account info page.</p>

                    <p>*Contact information is not required, but suggested. This is in case an event host wants to contact you, or you are a host and the attendees want to contact you.*</p>
                </>
            )
        } else {
            window.location = '/'
            // return(
            //     <>
            //         <h1>I think you have reached a page on accident.</h1>
            //     </>
            // )
        }
    }
}

export default EditUserPage