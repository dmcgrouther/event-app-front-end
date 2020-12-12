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
                    <h2>Here are your events as an attendee.</h2>
                    <ul className="user-page-list">
                        {this.props.userEventsAsAttendeeToDisplayInfo.map((userEventAsAttendeeToDisplayInfo, i) => (
                            <li key={i} onClick={ () => this.handleClick(userEventAsAttendeeToDisplayInfo.objectId) }> <span className="user-page-list-item-text">{userEventAsAttendeeToDisplayInfo.objectEventName} {`${new Date(userEventAsAttendeeToDisplayInfo.objectEventDate).toLocaleString()} ${new Date(userEventAsAttendeeToDisplayInfo.objectEventDate).toTimeString().split(' ').slice(2).join(" ")}`} </span></li>
                        ))}
                    </ul>
                </>
            )
        }
    }
}

export default UserEventsAsAttendee;