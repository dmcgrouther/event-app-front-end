import React from 'react';
//used this heavily https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
import './EventListPageTable.css'
// import Event from './Event'
import { Link } from 'react-router-dom';
import axios from 'axios';




class EventListPageTable extends React.Component {

    // constructor(props){
    //     super(props)
    //         this.state = {
    //             events: events
    //         }
    //     }
    state = {
        events: []
    }

    handleClick(id){
        // console.log(`clicked!`)
        console.log(id)
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
                // <tr className="event">
                // <tr className="event" key={event._id}>
                <tr className="event" key={event._id}>
                {/* <tr className="event" key={event._id}></tr> */}
                    {/* <td><span onClick={this.handleClick(event._id)}>{eventName}</span></td> */}
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
                        {this.renderTableData()}
                    </tbody>
                </table>
                <p id="event-list-bottom-text">Don't see what you like? Click <Link to={'/CreateEvent'}>here</Link> to create your own event!</p>
            </div>
        )
    }
}

{/* <p>
If not, sign up <Link to={'/Register'}>here</Link>!
</p> */}
{/* <p id="event-list-bottom-text">Don't see what you like? Click <Link to={'/CreateEvent'}>here</Link> to create your own event!</p> */}

export default EventListPageTable;