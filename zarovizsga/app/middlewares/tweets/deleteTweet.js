module.exports = (objRep) => {
    const {db, tweetModel} = objRep;

    return (req, res, next) => {
        let tweet = res.locals.tweet;

        // ha nem ő a tweet szerzője, akkor nem szerkesztheti
        if(tweet.user_id != req.session.userid) {
            return res.redirect("/");
        }

        tweetModel.remove(tweet);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/");
        });
    }
}