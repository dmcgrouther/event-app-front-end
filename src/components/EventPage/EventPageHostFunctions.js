import React, { Component } from 'react';
import axios from 'axios';
// https://stackoverflow.com/questions/7310559/the-best-way-to-remove-array-element-by-value

class EventPageHostFunctions extends Component {

    // getUsersInEventNames () {
    //     console.log(`getUsersInEventNames activated.`)
    //     this.props.nonHostUsers.map((nonHostUser) => {
    //         console.log(nonHostUser)
    //         axios.get(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`)
    //         .then(res => {
    //             console.log(res)

    //             let userObject = {
    //                 objectUserName: res.data.data.name,
    //                 objectId: res.data.data._id,
    //             }

    //             this.setState({
    //                 usersInEventToDisplayName: this.state.usersInEventToDisplayName.concat(userObject)
    //             })
    //         })
    //         .catch((error) => console.log(error))
    //     })
    // }

    handleClick(e){
        console.log(e)
        window.location = `/users/${e}`
    }
    
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

            //before this. do get request for each attendee? update state of with that attendees list? and then edit?
            
            this.props.nonHostUsers.forEach(nonHostUser => {
                console.log(`nonhostuser is ${nonHostUser}`)
                axios.get(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        usersEventsAsAttendee: res.data.data.usersEventsAsAttendee,
                    })
                    

                    console.log(`nonHostUser is ${nonHostUser}`)
                    console.log('state below')
                    console.log(this.state)
    
                    console.log('check below')
                    console.log(this.state)
                    console.log(this.state.usersEventsAsAttendee)
                    let newIndex = this.state.usersEventsAsAttendee.indexOf(`${window.location.pathname.split('/')[2]}`);
                    let newUsersEventsAsAttendee = this.state.usersEventsAsAttendee;
                    if(newIndex > -1){
                        newUsersEventsAsAttendee.splice(newIndex,1)
                    }
    
                    this.setState({
                        usersEventsAsAttendee: newUsersEventsAsAttendee
                    })
    
                    axios.put(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`, {
                        usersEventsAsAttendee: this.state.usersEventsAsAttendee
                    })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => console.log(error))


                })
                .catch((error) => console.log(error))

                // console.log(`nonHostUser is ${nonHostUser}`)
                // console.log('state below')
                // console.log(this.state)

                // console.log('check below')
                // console.log(this.state)
                // console.log(this.state.usersEventsAsAttendee)
                // let newIndex = this.state.usersEventsAsAttendee.indexOf(`${window.location.pathname.split('/')[2]}`);
                // let newUsersEventsAsAttendee = this.state.usersEventsAsAttendee;
                // if(newIndex > -1){
                //     newUsersEventsAsAttendee.splice(newIndex,1)
                // }

                // this.setState({
                //     usersEventsAsAttendee: newUsersEventsAsAttendee
                // })

                // axios.put(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`, {
                //     usersEventsAsAttendee: this.state.newUsersEventsAsAttendee
                // })
                // .then((response) => {
                //     console.log(response)
                // })
                // .catch((error) => console.log(error))

            //     axios.put(`${process.env.REACT_APP_API_URL}/users/${nonHostUser}`, {
            //         usersEventsAsAttendee: usersEventsAsAttendee.filter(val => val !== nonHostUser)
            //     })
            });

            window.location = '/eventlist';
        }).catch(err => console.log(err));
    }
    
    render() {

        if(this.props.usersInEventToDisplayName.length === 0){
            return(
                <>
                    <h1>Currently there are no attendees for this event.</h1>
                    <br />
                    <p>If you would like to delete this event, you may do so below.</p> 
                    <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete this event?')) this.deleteThisEvent(event) } }>
                        Delete This Event
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <h2>The event attendees are listed below</h2>
                    <ul>
                        {this.props.usersInEventToDisplayName.map((userInEventToDisplayName, i) => (
                            <li key={i} onClick={ () => this.handleClick(userInEventToDisplayName.objectId) }>{userInEventToDisplayName.objectUserName}</li>
                        ))}
                    </ul>
    
                    <br />
                    <p>If you would like to delete this event, you may do so below.</p> 
                    <button  onClick={(event) => { if (window.confirm('Are you sure you want to delete this event?')) this.deleteThisEvent(event) } }>
                        Delete This Event
                    </button>
                </>
            )
        }
    }
}

export default EventPageHostFunctions;