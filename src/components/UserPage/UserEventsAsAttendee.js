import React, { Component } from 'react';

class UserEventsAsAttendee extends Component {

    handleClick(e) {
        console.log(e)
        window.location = `/events/${e}`
    }

    organizeEventsAsAttendeeByDate() {
        this.props.userEventsAsAttendeeToDisplayInfo.sort(function(a,b){
            let dateA = new Date(a.objectEventDate), dateB = new Date(b.objectEventDate);
            return dateA - dateB
        })
    }

    render(){
        
        if(this.props.userEventsAsAttendeeToDisplayInfo.length < 1){
            return(
                <>
                    <h2>You have no events listed as an attendee.</h2>
                </>
            )
        } else {
            { this.organizeEventsAsAttendeeByDate() }
            return(
                <>
                    <div>
                        <h2>Here are your events as an attendee.</h2>
                        <ul>
                            {this.props.userEventsAsAttendeeToDisplayInfo.map((userEventAsAttendeeToDisplayInfo, i) => (
                                // <li key={i} onClick={ () => this.handleClick(userEventAsAttendeeToDisplayInfo.objectId) }>{userEventAsAttendeeToDisplayInfo.objectEventName} {userEventAsAttendeeToDisplayInfo.objectEventDate}</li>
                                <li key={i} onClick={ () => this.handleClick(userEventAsAttendeeToDisplayInfo.objectId) }>{userEventAsAttendeeToDisplayInfo.objectEventName} {`${new Date(userEventAsAttendeeToDisplayInfo.objectEventDate).toLocaleString()} ${new Date(userEventAsAttendeeToDisplayInfo.objectEventDate).toTimeString().split(' ').slice(2).join(" ")}`}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )
        }
    }
}

export default UserEventsAsAttendee;