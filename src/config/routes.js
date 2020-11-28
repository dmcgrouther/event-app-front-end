import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import EventListPage from '../components/EventListPage/EventListPage';
import Register from '../components/Register';
import Login from '../components/Login';
import CreateEvent from '../components/CreateEvent';
import EventPage from '../components/EventPage/EventPage';
import ViewUserPage from '../components/ViewUserPage';
import AccountDeleted from '../components/AccountDeleted';

export default ({ currentUser, setCurrentUser }) => (
    <Switch>
        <Route exact path='/' component={ Home }/>
        <Route path='/about' component= { About }/>
        <Route path='/eventlist' component={ EventListPage }/>
        <Route path='/register' render={() => <Register currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/login' render={() => <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        {/* <Route path='/CreateEvent' component={ CreateEvent } /> */}
        <Route path='/CreateEvent' render={() => <CreateEvent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/events/:eventId' render={() => <EventPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/users/:userId' render={() => <ViewUserPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/accountDeleted' component={ AccountDeleted } />
    </Switch>
);