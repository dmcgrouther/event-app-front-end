import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewUserPage.css';
import UsersEventsAsAttendee from './UserEventsAsAttendee';
import UserEventsAsHost from './UserEventsAsHost';
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
            userEventsAsAttendeeToDisplayInfo: [],
            userEventsAsHostToDisplayInfo: [],
        }
    }

    handleClick(e) {
        // console.log(e)
        window.location = `/events/${e}`
    }

    getUsersEventsNamesAsAttendee () {
        this.state.usersEventsAsAttendee.forEach((usersEventAsAttendee) => {
            // console.log(usersEventAsAttendee)
            axios.get(`${process.env.REACT_APP_API_URL}/events/${usersEventAsAttendee}`)
            .then(res => {
                // console.log(res)

                let eventObject = {
                    objectEventName: res.data.data.eventName,
                    objectEventDate: res.data.data.eventDate,
                    objectId: res.data.data._id,
                }

                this.setState({                    
                    userEventsAsAttendeeToDisplayInfo: this.state.userEventsAsAttendeeToDisplayInfo.concat(eventObject)
                })
            })
            // .catch((error) => console.log(error))
            .catch((err) => err)
        })
    }

    getUsersEventsNamesAsHost () {
        this.state.eventsUserIsHosting.forEach((eventUserIsHosting) => {
            // console.log(eventUserIsHosting)
            axios.get(`${process.env.REACT_APP_API_URL}/events/${eventUserIsHosting}`)
            .then(res => {
                // console.log(res)

                let eventHostingObject = {
                    eventHostingObjectName: res.data.data.eventName,
                    eventHostingObjectDate: res.data.data.eventDate,
                    eventHostingObjectId: res.data.data._id,
                }

                this.setState({
                    userEventsAsHostToDisplayInfo: this.state.userEventsAsHostToDisplayInfo.concat(eventHostingObject)
                })
            })
            // .catch((error) => console.log(error))
            .catch((err) => err)
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
            // console.log(res)
            this.getUsersEventsNamesAsAttendee()
            this.getUsersEventsNamesAsHost()
          })
        //   .catch((err) => console.log(err));
          .catch((err) => err)
    }

    // deleteYourAccount(event){
    //     // window.location = '/accountdeleted';
    //     console.log('delete delete!')
    //     axios.delete(`${process.env.REACT_APP_API_URL}/users/${window.location.pathname.split('/')[2]}`)
    //     .then(res => {
    //         console.log(res);
    //         // this.props.setCurrentUser('');
    //         // window.location = '/accountdeleted';
    //     }).catch(err => console.log(err));
    // }

    render () {
        if(this.props.currentUser === window.location.pathname.split('/')[2]){
            return (
                <>
                <div className='view-user-info'>
                    <h1>Your username is: {this.state.name}</h1>
                    <h1>Your contact information is: {this.state.contactInfo}</h1>
                    <p>If you would like to edit your username and contact information, you may do so <Link to={`/edituser/${window.location.pathname.split('/')[2]}`}>here</Link>.</p>
                    <br />
                    <div>
                        <UsersEventsAsAttendee userEventsAsAttendeeToDisplayInfo={this.state.userEventsAsAttendeeToDisplayInfo} />
                        <br />
                        <UserEventsAsHost userEventsAsHostToDisplayInfo={this.state.userEventsAsHostToDisplayInfo} />
                    </div>
                    <br />
                    <br />
                    {/* <p>If you would like to delete your account, you can do so by clicking the button below.</p>
                    <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete your account?')) this.deleteYourAccount(event) } }>
                        Delete My Account
                    </button> */}
                </div>
                </>
              );
        } else {
            return (
                <>
                <div className='view-user-info'>
                    <h1>User Name: {this.state.name}</h1>
                    <h1>User Contact Info: {this.state.contactInfo}</h1>
                    <h1>{this.state.profilePicture}</h1>
                </div>
                </>
            )
        }
    }
}

export default ViewUserPage;