import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/About'}>About</Link>
                <Link to={'/EventList'}>Event List</Link>
                <Link to={'/Register'}>Register</Link>
                <Link to={'/Login'}>Login</Link>
                <button onClick={() => props.logout() }>Logout</button>
                {/* {props.currentUser} */}
            </nav>
        </header>
    );
};

export default Navbar;