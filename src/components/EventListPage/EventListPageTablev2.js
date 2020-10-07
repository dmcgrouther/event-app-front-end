import React from 'react';
//used this heavily https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
import './EventListPageTablev2.css'
import Event from './Event'

let events = [
    {
        eventName: 'Minataur Rage!',
        gameSystem: 'Dungeons & Dragons',
        // gameEdition: '5th Edition',
        meetupType: 'Online',
        eventDate: '10-1-2020 7pm PST',
        numberOfPlayers: '2 of 5',
    },
    {
        eventName: 'Grimark Adeventures!!',
        gameSystem: 'Dark Heresy',
        // gameEdition: '1st Edition',
        meetupType: 'Online',
        eventDate: '10-1-2020 7:30pm PST',
        numberOfPlayers: '5 of 5',
    },
    {
        eventName: 'Super heroes!',
        gameSystem: 'Fate Core',
        // gameEdition: '1st Edition',
        meetupType: 'Online',
        eventDate: '10-2-2020 10:00pm PST',
        numberOfPlayers: '3 of 5',
    }
];


class EventListPageTablev2 extends React.Component {

    constructor(props){
        super(props)
            this.state = {
                events: events
            }
        }
    renderTableHeader() {
        let header = Object.keys(this.state.events[0])
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    renderTableData() {
        return this.state.events.map((event, index) => {
            const { eventName, gameSystem, meetupType, eventDate, numberOfPlayers} = event
            return (
                <tr className="event">
                    <td>{eventName}</td>
                    <td>{gameSystem}</td>
                    <td>{meetupType}</td>
                    <td>{eventDate}</td>
                    <td>{numberOfPlayers}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 id="event-list-header">Upcoming Game Sessions</h1>
                <p>*Account needed to create or signup for events*</p>
                <p>Click on an event to learn more!</p>
                <table id="events-table">
                    <tbody>
                        <tr id="table-header">{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <p id="event-list-bottom-text">Don't see what you want to play? Click here to create your own event!</p>
            </div>
        )
    }
}

export default EventListPageTablev2;