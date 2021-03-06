const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlaceSchema = new Schema({
    placeID: String,
    guests: [String]
});

const Place = mongoose.model('place', PlaceSchema);

module.exports = Place;