module.exports = (objRep) => {
    const {tweetModel} = objRep;

    return (req, res, next) => {
        // lekérdezzük az összes tweet számát
        res.locals.tweetCount = tweetModel.find().length;

        // ha be van jelentkezve, lekérdezzük az összes általa közzétett tweet számát
        if(typeof req.session.userid !== 'undefined') {
            res.locals.userTweetCount = tweetModel.find({user_id: req.session.userid}).length;
        }

        return next();
    }
}