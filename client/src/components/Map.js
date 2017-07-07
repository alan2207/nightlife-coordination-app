import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';


// getting markers from location properties on all places
function extractMarkers(markers) {
    return markers.map(marker => {
        return <Marker key={marker.name} title={marker.name} position={{lat: marker.position.latitude, lng: marker.position.longitude}} />
    })
}


export default function(props) {
    return (
        <GoogleMapLoader
            containerElement={<div style={{height: '100%'}} />}
            googleMapElement={
                <GoogleMap defaultZoom={13} center={{lat: props.position.latitude, lng: props.position.longitude}}>
                {extractMarkers(props.markers)}
                </GoogleMap>
            }
         />
    );
}