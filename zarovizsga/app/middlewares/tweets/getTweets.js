module.exports = (objRep) => {
    const {tweetModel, userModel} = objRep;

    return (req, res, next) => {
        let searchParam = null;

        // ha van megadva userid, akkor adott user tweetjeit kell listáznunk
        if(typeof req.params.userid != 'undefined') {
            searchParam = {user_id: req.params.userid};
            res.locals.username = userModel.findOne({id: req.params.userid}).email;
        }

        res.locals.tweets = tweetModel.find(searchParam);
        return next();
    }
}