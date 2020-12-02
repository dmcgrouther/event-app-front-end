import React, { Component } from 'react';
import axios from 'axios';
//https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402
// https://stackoverflow.com/questions/54712518/how-to-render-results-from-axios-function-with-mapping

class ViewUserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            contactInfo: '',
            profilePicture: '',
            usersEventsAsAttendee: [],
            eventsUserIsHosting: [],
            userEventsToDisplayInfo: [],
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContactInfoChange = this.handleContactInfoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(e) {
        console.log(e)
        window.location = `/events/${e}`
    }

    getUsersEventsNamesAsAttendee () {
        this.state.usersEventsAsAttendee.map((usersEventAsAttendee) => {
            console.log(usersEventAsAttendee)
            axios.get(`${process.env.REACT_APP_API_URL}/events/${usersEventAsAttendee}`)
            .then(res => {
                console.log(res)

                let eventObject = {
                    objectEventName: res.data.data.eventName,
                    objectEventDate: res.data.data.eventDate,
                    objectId: res.data.data._id,
                }

                this.setState({                    
                    userEventsToDisplayInfo: this.state.userEventsToDisplayInfo.concat(eventObject)
                })
            })
            .catch((error) => console.log(error))
        })
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`)
          .then((res) => {
            this.setState({
                name: res.data.data.name,
                contactInfo: res.data.data.contactInfo,
                usersEventsAsAttendee: res.data.data.usersEventsAsAttendee,
                eventsUserIsHosting: res.data.data.eventsUserIsHosting,
            })
            console.log(res)
            this.getUsersEventsNamesAsAttendee()
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
                    <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete your account?')) this.deleteYourAccount(event) } }>
                        Delete My Account
                    </button>

                    <div>
                        <h2>Here are your upcoming events as an attendee</h2>
                        <ul>
                            {this.state.userEventsToDisplayInfo.map((userEventToDisplayInfo, i) => (
                                <li key={i} onClick={ () => this.handleClick(userEventToDisplayInfo.objectId) }>{userEventToDisplayInfo.objectEventName} at {userEventToDisplayInfo.objectEventDate}</li>
                            ))}
                        </ul>
                    </div>
                </>
              );
        } else {
            return (
                <>
                    <h1>User Name: {this.state.name}</h1>
                    <h1>User Contact Info: {this.state.contactInfo}</h1>
                    <h1>{this.state.profilePicture}</h1>
                </>
            )
        }
    }
}

export default ViewUserPage;