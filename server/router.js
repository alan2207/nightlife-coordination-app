const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const PlacesController = require('./controllers/places');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});





module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('Serving Nightlife App');
    });

    app.post('/signin', requireSignIn, Authentication.signin);

    app.post('/signup', Authentication.signup);

    app.get('/getplaces', PlacesController.getPlaces);

    app.get('/getlocation', PlacesController.getLocation);

    app.put('/updateguests', PlacesController.updateGuests);

}