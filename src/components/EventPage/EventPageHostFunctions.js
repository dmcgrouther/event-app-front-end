import React, { Component } from 'react';
import axios from 'axios';

class EventPageHostFunctions extends Component {
    
    deleteThisEvent(){
        console.log('deleteth thee!')
        axios.delete(`${process.env.REACT_APP_API_URL}/events/${window.location.pathname.split('/')[2]}`)
        .then(res => {
            console.log(res);
            window.location = '/eventlist';
        }).catch(err => console.log(err));
    }
    
    render() {
        return (
            <>
                <h2>Here are the event attendees</h2>

                <br />
                <br />
                <p>If you would like to delete the event, please do so below.</p> 
                <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete this event?')) this.deleteThisEvent(event) } }>
                    Delete This Event
                </button>
                <p>Your attendees may have their contact info listed if you want to inform them</p>
            </>
        )
    }
}

export default EventPageHostFunctions;