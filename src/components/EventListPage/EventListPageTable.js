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
        console.log(e)
        window.location.href = `events/${e}` //this takes the page you are on to the event
        // window.open(`http://localhost:3000/events/${e}`, '_blank') //this creates a new tab and links there
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then((res) => {
          this.setState({
              events: res.data.data
          })
          console.log('here')
          console.log(res.data.data)
        })
        .catch((err) => console.log(err));
    }
        
    renderTableHeader() {
        // let header = Object.keys(this.state.events[0])
        let headerColumns = ['Event Name', 'Game System', 'Meetup Type', 'Event Date', 'Number of Attendees', 'Experience Level']
        return headerColumns.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    renderTableData() {
        return this.state.events.map((event, index) => {
            const { eventName, gameSystem, howTheEventHappens, eventDate, maximumNonHostPlayerCount, currentNonHostPlayerCount , experienceLevel} = event
            return (
                
                <tr className="event" key={event._id} onClick={ () => this.handleClick(event._id) }>
                    {/* <td><span onClick={this.handleClick(event._id)}>{eventName}</span></td> */}
                    {/* <td><span onClick={ () => this.handleClick(event._id) }>{eventName}</span></td> */}
                    {/* <td><Link to={`/events/${event._id}`}>{eventName}</Link></td> */}
                    <td>{eventName}</td>
                    <td>{gameSystem}</td>
                    <td>{howTheEventHappens}</td>
                    <td>{eventDate}</td>
                    <td>{currentNonHostPlayerCount} of {maximumNonHostPlayerCount}</td>
                    <td>{experienceLevel}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 id="event-list-header">Upcoming Game Sessions</h1>
                <p className="event-list-top-text">*Account needed to create or signup for events*</p>
                <p className="event-list-top-text">Click on an event to learn more!</p>
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