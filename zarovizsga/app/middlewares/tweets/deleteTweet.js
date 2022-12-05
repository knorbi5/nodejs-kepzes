module.exports = (objRep) => {
    const {db, tweetModel} = objRep;

    return (req, res, next) => {
        let tweet = res.locals.tweet;

        tweetModel.remove(tweet);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/");
        });
    }
}