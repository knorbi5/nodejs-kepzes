module.exports = (objRep) => {
    const {tweetModel, userModel} = objRep;

    return (req, res, next) => {
        let searchParam = null;

        // ha van megadva userid, akkor adott user tweetjeit kell listáznunk
        if(typeof req.params.userid != 'undefined') {
            searchParam = {user_id: req.params.userid};
            res.locals.username = userModel.findOne({id: req.params.userid}).email;
        }

        // lekérdezzük az összes tweetet létrehozás szerinti fordított sorrendben (legújabb legelöl)
        res.locals.tweets = tweetModel.find(searchParam).reverse();

        // hozzáfűzzük a tweetekhez tartozó usereket
        const users = userModel.find();
        res.locals.tweets.forEach(tweet => {
            tweet.user = users.find((item) => {return item.id == tweet.user_id});
        });

        return next();
    }
}