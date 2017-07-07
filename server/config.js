
// modify this!!!
module.exports = {
    //db: //  database,
    port: 8081,
    secret: 'mydummysecret',
    yelp: {
        //clientID: //  client_id,
        //clientSecret: //  client_secret,
        token: {
            //access_token: //  token,
            expires_in: 15551999,
            token_type: "Bearer"
        },
        searchUrl: 'https://api.yelp.com/v3/businesses/search?categories=bars&location='
    }
};