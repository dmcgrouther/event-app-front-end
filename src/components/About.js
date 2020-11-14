import React from 'react';

const About = () => {
    return (
        <div>
            <div className="about__section">
            <h2 className="about__header">
                What is evently?
            </h2>
                <p className="about__sentence">
                This app is made so that tabletop gamers can find new events and host new ones.  If you want to discover
                new games, show people a game you enioy, or find a new group this could be a great website for you.
                </p>
            </div>
            <div className="about__section">
                <h2 className="about__header">
                    How does it work?
                </h2>
                <p className="about__sentence">
                A host will go to the create an event page where this individual will create an event with details
                about the event such as the game system, description of what you will be doing, and how to join.
                </p>
                <p className="about__sentence">
                From here, on the events page the event will be listed in order of when it occurs. The events happening in 
                the more immediate future will be displayed first
                </p>
                <p className="about__sentence">
                Click into the respective event to learn more! And if you want to, go ahead and join. 
                </p>
                <p className="about__sentence">
                *This site does not actually run events, it is a way to help find ones that you like.*
                </p>
            </div>
        </div>
    )
}

export default About;