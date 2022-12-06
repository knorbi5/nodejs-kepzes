const uuid = require('uuid');

// middleware-ek
const renderMW = require('../middlewares/render');
const getTweetsMW = require('../middlewares/tweets/getTweets');
const getTweetMW = require('../middlewares/tweets/getTweet');
const getUsersListMW = require('../middlewares/users/getUsersList');
const createTweetMW = require('../middlewares/tweets/createTweet');
const updateTweetMW = require('../middlewares/tweets/updateTweet');
const deleteTweetMW = require('../middlewares/tweets/deleteTweet');
const loginMW = require('../middlewares/users/login');
const logoutMW = require('../middlewares/users/logout');
const registerMW = require('../middlewares/users/register');
const authMW = require('../middlewares/users/auth');

// route-ok hozzáadása
function addRoutes(app, db, userModel, tweetModel) {
    // object repository - ebben gyűjtjük a middleware-ek által közösen használt objektumokat, így nem kell egyesével behívni őket minden middleware-ben
    const objRep = {
        db,
        userModel,
        tweetModel,
        uuid
    };

    // tweetek kezelése
    app.get('/', getTweetsMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'index')); // címlap, tweetek listája
    app.use('/createTweet', authMW(objRep), createTweetMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'create')); // új tweet form, mentés kezelése
    app.use('/updateTweet/:tweetId', authMW(objRep), getTweetMW(objRep), updateTweetMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'update')); // tweet szerkesztése form, mentés kezelése
    app.use('/deleteTweet/:tweetId', authMW(objRep), getTweetMW(objRep), deleteTweetMW(objRep)); // tweet törlése
    app.use('/user_tweets/:userid', getTweetsMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'index')); // adott user tweetjeinek listája

    // userek kezelése
    app.use('/login', loginMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'login'));
    app.use('/register', registerMW(objRep), getUsersListMW(objRep), renderMW(objRep, 'register'));
    app.use('/logout', logoutMW(objRep));
}

module.exports = addRoutes;