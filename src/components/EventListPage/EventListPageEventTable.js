import React from 'react';
import EventListPageTableHeader from './EventListPageTableHeader';
import EventListPageListOfEvents from './EventListPageListOfEvents';
import './EventListPageEventTable.css'

const EventListPageEventTable = () => {
    return (
        <div class="EventListPageEventTable">
            <EventListPageTableHeader />
            <EventListPageListOfEvents />
        </div>
    )
}

export default EventListPageEventTable;