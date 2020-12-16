import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="home-page__header-section">
                <h1>
                    Welcome to Event Finder!
                </h1>
                <p>A website to schedule and find your favorite virtual tabletop gaming sessions.</p>
            </div>
            <div className="home-page__second-section">
                <p>
                    Have an account already? Login <Link to={'/Login'}>here</Link>.
                </p>
                <p>
                    If not, you can create an account <Link to={'/Register'}>here</Link>!
                </p>
            </div>
        </div>
    );
};

export default Home;