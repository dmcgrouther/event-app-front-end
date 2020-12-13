import React, { Component } from 'react';
import axios from 'axios';
import EventInformation from './EventInformation';
import { Link } from 'react-router-dom';
import EventPageHostFunctions from './EventPageHostFunctions';
import './EventPage.css';

// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array

class EventPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventName: '',
            // gameSystem: '',
            additionalInfo1: '',

            // gameEdition: '',
            additionalInfo2: '',

            eventDate: '',
            maximumNonHostPlayerCount: '',

            // howTheEventHappens: 'Virtual', //going to have all events be listed as virtual for now.
            eventMeetupType: 'Virtual', //going to have all events be listed as virtual for now.

            meetupGatheringInfo: '',
            typeOfEventActivity: '',

            eventFamilyArchetype: 'Tabletop game',

            eventDescription: '',
            experienceLevel: '',
            eventLengthInHours: '',
            currentNonHostPlayerCount: '',
            nonHostUsers: '',
            hostUser: '',
            //
            usersEventsAsAttendee: [],
            eventsUserIsHosting: '',
            //
            usersInEventToDisplayName: [],
        };
        this.handleJoinEventClick = this.handleJoinEventClick.bind(this);
        this.handleRemoveCurrentUserFromEventClick = this.handleRemoveCurrentUserFromEventClick.bind(this);
        // this.deleteThisEvent = this.deleteThisEvent.bind(this);
    }

    getUsersInEventNames () {
        console.log(`getUsersInEventNames activated.`)
        this.state.nonHostUsers.map((nonHostUser) => {
            console.log(nonHostUser)
            axios.get(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`)
            .then(res => {
                console.log(res)

                let userObject = {
                    objectUserName: res.data.data.name,
                    objectId: res.data.data._id,
                }

                this.setState({
                    usersInEventToDisplayName: this.state.usersInEventToDisplayName.concat(userObject)
                })
            })
            .catch((error) => console.log(error))
        })
    }

    componentDidMount () {
        axios.all([
            axios.get(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`)
            .then((res) => {
              this.setState({
                  eventName: res.data.data.eventName,

                //   gameSystem: res.data.data.gameSystem,
                  additionalInfo1: res.data.data.additionalInfo1,

                //   gameEdition: res.data.data.gameEdition,
                  additionalInfo2: res.data.data.additionalInfo2,

                  eventDate: res.data.data.eventDate,
                  maximumNonHostPlayerCount: res.data.data.maximumNonHostPlayerCount,

                  //   howTheEventHappens: 'Virtual', //keep this set to virtual
                  eventMeetupType: 'Virtual', //keep this set to virtual
                  
                  meetupGatheringInfo: res.data.data.meetupGatheringInfo,
                  typeOfEventActivity: res.data.data.typeOfEventActivity,

                  eventFamilyArchetype: 'Tabletop game', //keep it set to this value.

                  eventDescription: res.data.data.eventDescription,
                  experienceLevel: res.data.data.experienceLevel,
                  eventLengthInHours: res.data.data.eventLengthInHours,
                  nonHostUsers: res.data.data.nonHostUsers,
                  currentNonHostPlayerCount: res.data.data.nonHostUsers.length,
                  hostUser: res.data.data.hostUser,
              })
              console.log(res)
              this.getUsersInEventNames()
            })
            .catch((err) => console.log(err)),

            axios.get(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`)
            .then((res) => {
                this.setState({
                    usersEventsAsAttendee: res.data.data.usersEventsAsAttendee,
                    eventsUserIsHosting: res.data.data.eventsUserIsHosting,
                })
                console.log(res)
                console.log(`eventsUserIsHosting is ${this.state.eventsUserIsHosting}`)
            })
            .catch((err) => console.log(err))

        ])
    }

    handleJoinEventClick(){
        console.log('clicked, yay!')
        console.log(this.state.nonHostUsers)
        console.log(this.props.currentUser)

        axios.all([
            axios.put(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`, {
                nonHostUsers: this.state.nonHostUsers.concat([this.props.currentUser]),
                currentNonHostPlayerCount: this.state.currentNonHostPlayerCount+1,
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error)
            }),

            axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
                usersEventsAsAttendee: this.state.usersEventsAsAttendee.concat(window.location.pathname.split('/')[2])
            })
            .then((response) => {
                console.log(response);
            },(error) => {
                console.log(error)
            })
        ])
        window.location.reload();
    }

    handleRemoveCurrentUserFromEventClick(){
        console.log('hello')
        let index = this.state.nonHostUsers.indexOf(this.props.currentUser);
        console.log(`the index is ${index}`)
        let newStateNonHostUsers = this.state.nonHostUsers;
        console.log(`this.state.nonHostUsers is ${this.state.nonHostUsers}`);
        console.log(`newStateNonHostUsers is ${newStateNonHostUsers}`);
        if (index > -1) {
            newStateNonHostUsers.splice(index, 1);
        }
        console.log(`newStateNonHostUsers is ${newStateNonHostUsers}`);


        let usersEventsIndex = this.state.usersEventsAsAttendee.indexOf(window.location.pathname.split('/')[2])
        let newUsersEventsAsAttendee = this.state.usersEventsAsAttendee; 
        console.log(`${usersEventsIndex} is usersEventsIndex`);
        if(index > -1){
            newUsersEventsAsAttendee.splice(usersEventsIndex, 1);
        }

        axios.all([
            axios.put(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`, {
                nonHostUsers: newStateNonHostUsers,
                currentNonHostPlayerCount: this.state.currentNonHostPlayerCount-1,
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error)
            }),

            axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
                usersEventsAsAttendee: newUsersEventsAsAttendee,
            })
            .then((response) => {
                console.log(response);
            },(error) => {
                console.log(error)
            })
        ])
        window.location.reload();
    }

    render () {
        if(this.props.currentUser === null && this.state.currentNonHostPlayerCount === this.state.maximumNonHostPlayerCount){
            return(
                <>
                    <div className="event-page-info">
                        <EventInformation />
                        <h4>Currently the event is full. </h4>
                        <h4>In order to sign up for this event or others, you must be signed in.</h4>
                        <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
                        <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
                    </div>
                </>
            )
        }else if(this.props.currentUser === null){
            return(
                <>
                    <div className="event-page-info">
                        <EventInformation />
                        <h4>In order to sign up for this event or others, you must be signed in.</h4>
                        <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
                        <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
                    </div>
                </>
            )
        }else if (this.props.currentUser === this.state.hostUser[0]){
            return(
                <>
                    <div className="event-page-info">
                        <h1>Here is an event you are hosting</h1>
                        <EventInformation />
                        <EventPageHostFunctions nonHostUsers={this.state.nonHostUsers} usersInEventToDisplayName={this.state.usersInEventToDisplayName} eventsUserIsHosting={this.state.eventsUserIsHosting} currentUser={this.props.currentUser} usersEventsAsAttendee={this.state.usersEventsAsAttendee}/>
                    </div>
                </>
            )
        } else if(this.state.nonHostUsers.includes(this.props.currentUser)){
            return(
                <>
                    <div className="event-page-info">
                        <h1>You are registered for this event</h1>
                        <EventInformation />
                        <button className="call-to-action-button" onClick={this.handleRemoveCurrentUserFromEventClick}>Click to unjoin</button>
                        <p>If you have questions, you can reach out to the host for this event.</p>
                        <p>Link to the event host's user page <Link to={`/users/${this.state.hostUser[0]}`}>here</Link>.</p>
                    </div>
                </>
            )
        }else if(this.props.currentUser !== null && this.state.nonHostUsers.includes(this.props.currentUser) === false && this.state.currentNonHostPlayerCount === this.state.maximumNonHostPlayerCount){
            return(
                <>
                    <div className="event-page-info">
                        <EventInformation />
                        <h4>Currently the event is full. </h4>
                        <p>If you have questions, <Link to={`/users/${this.state.hostUser[0]}`}>here</Link> is a link to the hosts user page to get their contact info.</p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="event-page-info">
                        <EventInformation />
                        <button className="call-to-action-button" onClick={this.handleJoinEventClick}>Click to join</button>
                        <p>If you have questions, <Link to={`/users/${this.state.hostUser[0]}`}>here</Link> is a link to the hosts user page to get their contact info.</p>
                    </div>
                </>
            )
        }
    }
}

export default EventPage;