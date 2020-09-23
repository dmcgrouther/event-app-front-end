import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import EventList from '../components/EventList'
import Register from '../components/Register'

export default (
    <Switch>
        <Route exact path='/' component={ Home }/>
        <Route path='/about' component= { About }/>
        <Route path='/eventlist' component={ EventList }/>
        <Route path='/register' component={ Register } />
    </Switch>
);