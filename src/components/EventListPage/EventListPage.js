import React from 'react';
import EventListPageHeader from './EventListPageHeader';
import EventListPageEventTable from './EventListPageEventTable';
import EventListPageBottomOfPage from './EventListPageBottomOfPage';
import EventListPageTablev2 from './EventListPageTablev2';

const EventListPage = () => {
    return (
        <>
            <EventListPageHeader/>
            <EventListPageEventTable/>
            <EventListPageBottomOfPage/>
            <EventListPageTablev2 />
        </>
    )
}

export default EventListPage;