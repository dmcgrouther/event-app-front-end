import React, { Component } from 'react';
import axios from 'axios';

class EventPageHostFunctions extends Component {
    
    deleteThisEvent(){
        console.log('deleteth thee!')

        console.log(this.props.eventsUserIsHosting)
        let index = this.props.eventsUserIsHosting.indexOf(`${window.location.pathname.split('/')[2]}`)
        let newEventsUserIsHosting = this.props.eventsUserIsHosting;
        console.log(`newEventsUserIsHosting is ${newEventsUserIsHosting}`)
        if(index > -1){
            newEventsUserIsHosting.splice(index, 1)
        }
        console.log(`newEventsUserIsHosting is below`)
        console.log(newEventsUserIsHosting)

        console.log(`index is ${index}`)

        axios.delete(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`)
        .then(res => {
            console.log(res)
            this.setState({
                eventsUserIsHosting: newEventsUserIsHosting,
            })
            axios.put(`${process.env.REACT_APP_API_URL}/users/${this.props.currentUser}`, {
                eventsUserIsHosting: this.state.eventsUserIsHosting 
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => console.log(error))
            window.location = '/eventlist';
        }).catch(err => console.log(err));
    }
    
    render() {
        return (
            <>
                <p>If you would like to delete this event, you may do so below.</p> 
                <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete this event?')) this.deleteThisEvent(event) } }>
                    Delete This Event
                </button>
                <p>Your attendees may have their contact info listed if you want to inform them</p>
            </>
        )
    }
}

export default EventPageHostFunctions;