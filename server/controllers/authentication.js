const jwt = require('jwt-simple');
const User = require('../models/User');
const {secret} = require('../config');


// create token for given user:
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, timestamp}, secret);
};


// signing in route callback
exports.signin = function(req, res, next) {
    res.send({token: tokenForUser(req.user), username: req.user.username})
}



// route callback for signing up:
exports.signup = function(req, res, next) {
    // extract email and password from the body
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(422).send({error: 'Email and password must be provided!'});
    }

    User.findOne({username: username})
        .then(user => {
            if(user) {
                res.status(422).send({error: 'Username is already in use!'});
            }
        })

    User.findOne({email: email}, function(err, existingUser) {
        if(err) {
            return next(err);
        }

        if(existingUser) {
            return res.status(422).send({error: 'Email is already in use!'});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save()
            .then(() => res.json({token: tokenForUser(user), username: user.username}))
            .catch((err) => next(err));
    });
}