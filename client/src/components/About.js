import React from 'react';


// renders info about the app
export default function(props) {
    return (
        <div className="container">
            <h2 className="center-align">About</h2>

            <p>This is a fullstack web application, built using the MERN stack. It was made as a part of FreeCodeCamp's Backend Curriculum.</p>
            <p>The frontend and the backend are completely separated, which makes it easy to integrate the app with other frontends.</p>

            <p>The app gets all the data from  <a href="https://www.yelp.com/developers/documentation/v3/get_started" target="_blank">Yelp API</a> .</p>
            
            <h3>User Stories:</h3>
            <p>As an unauthenticated user, I can view all bars in my area.</p>
            <p> As an authenticated user, I can add myself to a bar to indicate I am going there tonight.</p>
            <p>As an authenticated user, I can remove myself from a bar if I no longer want to go there.</p>
            <p>As an unauthenticated user, when I login I should not have to search again.</p>
            <p>I can view all places on the map.</p>
            <p>I can view guest lists of all places.</p>

            <h3>Technologies Used:</h3>
            <div className="row">
            <div className="col s6">
                <h4>Frontend:</h4>
                <ul>
                    <li>Materialize</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>React Router</li>
                    <li>Redux Thunk</li>
                    <li>Redux Form</li>
                    <li>React Google Maps</li>
                    <li>Axios</li>
                    <li>Webpack</li>
                    <li>Babel</li>
                </ul>
            </div>

            <div className="col s6">
                <h4>Backend:</h4>
                <ul>
                    <li>Node</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>Mongoose</li>
                    <li>Passport with JWT authentivation.</li>
                </ul>
            </div>
            </div>

        </div>
    )
}