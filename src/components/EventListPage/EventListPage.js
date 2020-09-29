import React from 'react';
import EventListPageHeader from './EventListPageHeader';
import EventListPageEventTable from './EventListPageEventTable';
import EventListPageBottomOfPage from './EventListPageBottomOfPage';

const EventListPage = () => {
    return (
        <>
            <EventListPageHeader/>
            <EventListPageEventTable/>
            <EventListPageBottomOfPage/>
        </>
    )
}

export default EventListPage;