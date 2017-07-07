const axios = require('axios');
const User = require('../models/User');
const Place = require('../models/Place');
const searchingURL = require('../config').yelp.searchUrl;
const token = require('../config').yelp.token.access_token;

// callback for getting places
exports.getPlaces = async function(req, res, next) {
    var {location, username} = req.query;

    // if username is provided, save location as last location to the current user
    if(location && username) {
        User.findOneAndUpdate({username: username}, {currentLocation: location}, {new: true})
            .then(user => {
                console.log(user)
            });
    }

    var data = await axios.get(searchingURL + location, {headers: {
        'Authorization': 'Bearer ' + token
    }})
    
    // reduce data to only what is required on the client
    data = transformPlaces(data.data)

    var places = data.businesses;

    // loop through and set guest list accordingly
    for(var i = 0; i < places.length; i++) {
         var guests = await Place.findOne({placeID: places[i].id})
         if(guests) {
             places[i].guests = guests.guests;
         } else {
             places[i].guests = [];
         }
    } 

    // send response
    res.send({
        businesses: places,
        region: data.region
    });

}


// getting last users location
// this callback will be triggered when user signs in
exports.getLocation = async function(req, res, next) {
    var {username} = req.query;

    var user = await User.findOne({username: username});

    var data = await axios.get(searchingURL + user.currentLocation, {headers: {
                     'Authorization': 'Bearer ' + token
                 }})
    
    // reduce data to only what is required on the client
    data = transformPlaces(data.data)

    var places = data.businesses;

    // loop through and set guest list accordingly
    for(var i = 0; i < places.length; i++) {
         var guests = await Place.findOne({placeID: places[i].id})
         if(guests) {
             places[i].guests = guests.guests;
         } else {
             places[i].guests = [];
         }
    } 

    // send response
    res.send({
        businesses: places,
        region: data.region
    });

}


// creates places and updates guests array in it
// triggered when updateguests route is being used
exports.updateGuests = function(req, res, next) {
    const {username, placeID} = req.body;

    // find the place
    Place.findOne({placeID: placeID})
        .then(place => {
            // check if the given place already exists in the db
            if(place) {
                // check if the user already going to the given place
                if(place.guests.indexOf(username) === -1) {
                    Place.findOneAndUpdate({placeID}, {$push: {guests: username}}, {new: true})
                    .then(place => res.send(place))
                    // otherwise remove it from the guests array
                } else {
                    Place.findOneAndUpdate({placeID}, {$pull: {guests: username}}, {new: true})
                    .then(place => res.send(place))
                }
                // if the place does not exist, create new one
            } else {
                const place = new Place({placeID: placeID, guests: [username]})
            place.save()
                .then(place => res.send(place))
            }
        })
}

// helper function
// reduces size of the data recived from yelp api
// get only what is required on the client
function transformPlaces(obj) {
    return {
        businesses: obj.businesses.map((business) => {
            return {
                name: business.name,
                id: business.id,
                image_url: business.image_url,
                phone: business.phone,
                location: business.location,
                rating: business.rating,
                url: business.url,
                coordinates: business.coordinates,
                }
            }),
        region: obj.region
    }
}