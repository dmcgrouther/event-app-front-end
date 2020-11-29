import React, { Component } from 'react';
import axios from 'axios';
import EventInformation from './EventInformation';
import { Link } from 'react-router-dom';
import EventPageHostFunctions from './EventPageHostFunctions'

// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array

class EventPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventName: '',
            gameSystem: '',
            gameEdition: '',
            eventDate: '',
            maximumNonHostPlayerCount: '',
            howTheEventHappens: '',
            meetupGatheringInfo: '',
            typeOfEventActivity: '',
            eventDescription: '',
            experienceLevel: '',
            eventLengthInHours: '',
            currentNonHostPlayerCount: '',
            nonHostUsers: '',
            hostUser: '',
        };
        this.handleJoinEventClick = this.handleJoinEventClick.bind(this);
        this.handleRemoveCurrentUserFromEventClick = this.handleRemoveCurrentUserFromEventClick.bind(this);
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`)
          .then((res) => {
            this.setState({
                eventName: res.data.data.eventName,
                gameSystem: res.data.data.gameSystem,
                gameEdition: res.data.data.gameEdition,
                eventDate: res.data.data.eventDate,
                maximumNonHostPlayerCount: res.data.data.maximumNonHostPlayerCount,
                howTheEventHappens: res.data.data.howTheEventHappens,
                meetupGatheringInfo: res.data.data.meetupGatheringInfo,
                typeOfEventActivity: res.data.data.typeOfEventActivity,
                eventDescription: res.data.data.eventDescription,
                experienceLevel: res.data.data.experienceLevel,
                eventLengthInHours: res.data.data.eventLengthInHours,
                nonHostUsers: res.data.data.nonHostUsers,
                currentNonHostPlayerCount: res.data.data.nonHostUsers.length,
                hostUser: res.data.data.hostUser,
            })
            console.log(res)
          })
          .catch((err) => console.log(err));
    }

    handleJoinEventClick(){
        console.log('clicked, yay!')
        console.log(this.state.nonHostUsers)
        console.log(this.props.currentUser)
        axios.put(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`, {
            nonHostUsers: this.state.nonHostUsers.concat([this.props.currentUser]),
            currentNonHostPlayerCount: this.state.currentNonHostPlayerCount+1,
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error)
        });
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

        axios.put(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`, {
            nonHostUsers: newStateNonHostUsers,
            currentNonHostPlayerCount: this.state.currentNonHostPlayerCount-1,
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error)
        });
        window.location.reload();
    }

    render () {
        if(this.props.currentUser === null && this.state.currentNonHostPlayerCount === this.state.maximumNonHostPlayerCount){
            return(
                <>
                    <EventInformation />
                    <h4>Currently the event is full. </h4>
                    <h4>In order to sign up for this event or others, you must be signed in.</h4>
                    <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
                    <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
                </>
            )
        }else if(this.props.currentUser === null){
            return(
                <>
                    <EventInformation />
                    <h4>In order to sign up for this event or others, you must be signed in.</h4>
                    <p>Click <Link to={'/Login'}>here</Link> to login to your account.</p>
                    <p>Don't have an account? Click <Link to={'/Register'}>here</Link> to create an account.</p>
                </>
            )
        }else if (this.props.currentUser === this.state.hostUser[0]){
            return(
                <>
                    <h1>Here is an event you are hosting</h1>
                    <EventInformation />
                    <EventPageHostFunctions nonHostUsers={this.state.nonHostUsers}/>
                </>
            )
        } else if(this.state.nonHostUsers.includes(this.props.currentUser)){
            return(
                <>
                    <h1>You are registered for this event</h1>
                    <EventInformation />
                    <button onClick={this.handleRemoveCurrentUserFromEventClick}>Click here to un-register for the event</button>
                    <p>If you have questions, you can reach out to the host for this event.</p>
                    <p>Link to the event host's user page <Link to={`/users/${this.state.hostUser[0]}`}>here</Link>.</p>
                </>
            )
        }else if(this.props.currentUser !== null && this.state.nonHostUsers.includes(this.props.currentUser) === false && this.state.currentNonHostPlayerCount === this.state.maximumNonHostPlayerCount){
            return(
                <>
                    <EventInformation />
                    <h4>Currently the event is full. </h4>
                    <p>If you have questions, <Link to={`/users/${this.state.hostUser[0]}`}>here</Link> is a link to the hosts user page to get their contact info.</p>
                </>
            )
        } else {
            return (
                <>
                    <EventInformation />
                    <button onClick={this.handleJoinEventClick}>Click here to join</button>
                    <p>If you have questions, <Link to={`/users/${this.state.hostUser[0]}`}>here</Link> is a link to the hosts user page to get their contact info.</p>
                </>
            )
        }
    }
}

export default EventPage;