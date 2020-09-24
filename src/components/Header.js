import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/About'}>About</Link>
                <Link to={'/EventList'}>Event List</Link>
                <Link to={'/Register'}>Register</Link>
                <Link to={'/Login'}>Login</Link>
            </nav>
        </header>
    );
};

export default Header;