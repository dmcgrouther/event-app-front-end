import React from 'react';
import './EventListPageTableHeader.css'

const EventListPageTableHeader = () => {
    return (
        <div>
            <h3 class='EventListPageTableHeader__column'>Event Name</h3>
            <h3 class='EventListPageTableHeader__column'>Game System</h3>
            <h3 class='EventListPageTableHeader__column'>Meetup Type</h3>
            <h3 class='EventListPageTableHeader__column'>Date and Time</h3>
            <h3 class='EventListPageTableHeader__column'># Players</h3>
            <hr></hr>
        </div>
    )
}

export default EventListPageTableHeader;