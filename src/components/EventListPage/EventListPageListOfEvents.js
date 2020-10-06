import React from 'react';
import './EventListPageListOfEvents.css'

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

const Event = (props) => {
    return (
        <>
            <div className="event">
                <div>{props.eventName}</div>
                <div>{props.gameSystem}</div>
            </div>
        </>
    )
}

const EventListPageListOfEvents = (props) => {
    let eventList = events;
    let listItems = eventList.map((event) => {
        return (
            <Event
                eventName={event.eventName}
                gameSystem={event.gameSystem}
            />
        );
    })

    return (
        <>
            {listItems}
        </>
    )
}

export default EventListPageListOfEvents;