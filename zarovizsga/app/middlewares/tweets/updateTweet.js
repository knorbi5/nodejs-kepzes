module.exports = (objRep) => {
    const {db, tweetModel} = objRep;

    return (req, res, next) => {
        // ha nem mentésben (POST kérésben) vagyunk
        if(typeof req.body.content == 'undefined') {
            return next();
        }

        let tweet = res.locals.tweet;

        tweet.content = req.body.content;

        tweetModel.update(tweet);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/");
        });
    }
}