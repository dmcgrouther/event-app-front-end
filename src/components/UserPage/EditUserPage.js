import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EditUserPage.css'

class EditUserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            contactInfo: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    
    handleSubmit(event){
        event.preventDefault();
        // console.log(this.state.name);
        // console.log(this.state.contactInfo);
        axios.put(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`, {
            name: this.state.name,
            contactInfo: this.state.contactInfo
        })
        // .then((response) => {
        //     console.log(response);
        // }, (error) => {
        //     console.log(error)
        // })
        .then((response) => response)
        .catch((error) => error)
        ;
    }

    render() {
        if(this.props.currentUser === window.location.pathname.split('/')[2]){
            return(
                <>
                    <h1 className="edit-user-page-header">Edit your information</h1>
                    <div className="edit-user-area">
                        <form onSubmit={this.handleSubmit}>
                        <div className="edit-user-field">
                            <label>
                                User Name:
                                <br />
                                <input onChange={this.handleChange} id="name" name="name" type="text" value={this.state.name} maxLength="40" required={true} />
                            </label>
                        </div>
                        <div className="edit-user-field">
                            <label>
                                Contact Info:
                                <br />
                                <input onChange={this.handleChange} id="contactInfo" name="contactInfo" type="text" value={this.state.contactInfo} maxLength="80" />
                            </label>
                        </div>
                        <br />
                        <button className="btn btn-primary float-right call-to-action-button" type="submit">Save Changes</button>
                        </form>
                        <p>Click <Link to={`/users/${window.location.pathname.split('/')[2]}`}>here</Link> to return to your account info page.</p>

                        <p>*Contact information is not required, but suggested. This is in case an event host wants to contact you, or you are a host and the attendees want to contact you.*</p>
                    </div>
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