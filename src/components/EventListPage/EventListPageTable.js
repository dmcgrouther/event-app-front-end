import React, { Component } from 'react';
//used this heavily https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
import './EventListPageTable.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

class EventListPageTable extends Component {

    state = {
        events: []
    }

    handleClick(e) {
        // console.log(e)
        window.location.href = `events/${e}` //this takes the page you are on to the event
        // window.open(`http://localhost:3000/events/${e}`, '_blank') //this creates a new tab and links there
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then((res) => {
          this.setState({
              events: res.data.data
          })
        //   console.log('here')
        //   console.log(res.data.data)
        })
        .catch((error) => error)
        // .catch((err) => console.log(err));
    }
        
    renderTableHeader() {
        // let header = Object.keys(this.state.events[0])
        let headerColumns = ['Event Name', 'Game System', 'Meetup Type', 'Event Date', 'Number of Attendees', 'Experience Level']
        return headerColumns.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    renderTableData() {
        const sortedEventsByDate = this.state.events;
        sortedEventsByDate.sort(function(a,b){
            let dateA = new Date(a.eventDate), dateB = new Date(b.eventDate);
            return dateA - dateB
        });

        return sortedEventsByDate.map((event, index) => {
        // return this.state.events.map((event, index) => {

            const { eventName, additionalInfo1, eventMeetupType, eventDate, maximumNonHostPlayerCount, currentNonHostPlayerCount , experienceLevel} = event

            let dateAndTimeRightNow = new Date();
            let eventDateToCompare = new Date(eventDate)

            // console.log(`event is ${eventDateToCompare.getTime()} dateAndTimeRightNow is ${dateAndTimeRightNow.getTime()}`)
            
            // if(eventDateToCompare.getTime() > dateAndTimeRightNow.getTime() ) return (
                
            //     <tr className="event" key={event._id} onClick={ () => this.handleClick(event._id) }>
            //         {/* <td><span onClick={this.handleClick(event._id)}>{eventName}</span></td> */}
            //         {/* <td><span onClick={ () => this.handleClick(event._id) }>{eventName}</span></td> */}
            //         {/* <td><Link to={`/events/${event._id}`}>{eventName}</Link></td> */}
            //         <td>{eventName}</td>
            //         <td>{additionalInfo1}</td>
            //         <td>{eventMeetupType}</td>
            //         <td>{`${new Date(eventDate).toLocaleString()} ${new Date(eventDate).toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]}`}</td>
            //         <td>{currentNonHostPlayerCount || 0 } of {maximumNonHostPlayerCount}</td>
            //         <td>{experienceLevel}</td>
            //     </tr>
            // )

            if(eventDateToCompare.getTime() > dateAndTimeRightNow.getTime()){
                return(
                    <tr className="event" key={event._id} onClick={ () => this.handleClick(event._id) }>
                        <td>{eventName}</td>
                        <td>{additionalInfo1}</td>
                        <td>{eventMeetupType}</td>
                        <td>{`${new Date(eventDate).toLocaleString()} ${new Date(eventDate).toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]}`}</td>
                        <td>{currentNonHostPlayerCount || 0 } of {maximumNonHostPlayerCount}</td>
                        <td>{experienceLevel}</td>
                    </tr>
                )
            } else {
                return null
            }
        })
    }

    render() {
        return (
            <div>
                <table id="events-table">
                    <tbody>
                        <tr id="table-header">{this.renderTableHeader()}</tr>
                        { this.renderTableData() }
                    </tbody>
                </table>
                <p id="event-list-bottom-text">Don't see what you like? Click <Link to='/CreateEvent'>here</Link> to create your own event!</p>
            </div>
        )
    }
}

export default EventListPageTable;