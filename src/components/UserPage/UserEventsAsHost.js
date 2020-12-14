import React, { Component } from 'react';

class UserEventsAsHost extends Component {

    handleClick(e) {
        console.log(e)
        window.location = `/events/${e}`
    }

    organizeEventsAsHostByDate() {
        this.props.userEventsAsHostToDisplayInfo.sort(function(a,b){
            let dateA = new Date(a.eventHostingObjectDate), dateB = new Date(b.eventHostingObjectDate);
            return dateA - dateB
        })
    }

    render(){
        if(this.props.userEventsAsHostToDisplayInfo < 1){
            return(
                <>
                    <h2>You have no events listed as a host.</h2>
                </>
            )
        } else {
            this.organizeEventsAsHostByDate()
            return(
                <>
                    <h2>Here are your events as a host.</h2>
                    <ul className="user-page-list">
                            {this.props.userEventsAsHostToDisplayInfo.map((userEventsAsHostToDisplayInfo, i) => (
                                <li key={i} onClick={ () => this.handleClick(userEventsAsHostToDisplayInfo.eventHostingObjectId) }><span className="user-page-list-item-text"> {userEventsAsHostToDisplayInfo.eventHostingObjectName} {`${new Date(userEventsAsHostToDisplayInfo.eventHostingObjectDate).toLocaleString()} ${new Date(userEventsAsHostToDisplayInfo.eventHostingObjectDate).toTimeString().split(' ').slice(2).join(" ")}`} </span></li>
                            ))}
                    </ul>
                </>
            )
        }
    }

}

export default UserEventsAsHost;