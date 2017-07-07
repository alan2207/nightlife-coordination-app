import React from 'react';
import {connect} from 'react-redux';

import Place from '../components/Place';
import Map from '../components/Map'; 

class Searchresults extends React.Component {
    constructor(props) {
        super(props);
    }

    // rendering all places
    renderPlaces() {
        return this.props.places.map(place => {
            return <Place name={place.name}
                          placeID={place.id}
                          key={place.id}
                          guests={place.guests}
                          image={place.image_url}
                          phone={place.phone} 
                          address={place.location.address1}
                          rating={place.rating}
                          link={place.url} />
        })
    }
    
    // extracting markers from the data
    extractMarkers() {
        return this.props.places.map(place => {
            return {
                name: place.name,
                position: place.coordinates

            };
        });
    }

    renderResults() {
        return this.props.places.length ? (
            <div className="results-wrapper">
                <div className="results">

                {this.renderPlaces()}
                 
                </div>

                <div className="map">
                    <Map position={this.props.position} markers={this.extractMarkers()}/>
                </div>
            </div>
        ) : <div></div>
    }

    render() {
        return(
            <div>
            {this.renderResults()}
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        places: state.places,
        position: state.position
    };
}


export default connect(mapStateToProps)(Searchresults);