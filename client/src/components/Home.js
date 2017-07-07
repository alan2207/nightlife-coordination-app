import React from 'react';



import Search from './Search';
import Searchresults from '../containers/Searchresults';


// home component on index route
class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <h2 className="center-align">Nightlife Coordination App</h2>
                <Search />
                <Searchresults />
            </div>
        )
    }
}


export default Home;