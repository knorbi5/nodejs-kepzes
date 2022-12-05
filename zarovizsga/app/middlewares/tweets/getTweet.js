module.exports = (objRep) => {
    const {tweetModel} = objRep;

    return (req, res, next) => {
        res.locals.tweet = tweetModel.findOne({id: req.params.tweetId});
        return next();
    }
}