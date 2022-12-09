module.exports = (objRep) => {
    const {db, tweetModel} = objRep;

    return (req, res, next) => {
        let tweet = res.locals.tweet;
        
        // ha nem ő a tweet szerzője, akkor nem szerkesztheti
        if(tweet.user_id != req.session.userid) {
            return res.redirect("/");
        }

        // ha nem mentésben (POST kérésben) vagyunk
        if(typeof req.body.content == 'undefined') {
            return next();
        }

        // ha nem adott meg szöveget
        if(!req.body.content.length) {
            res.locals.error = "Kérem, adja meg a tweet szövegét!";
            return next();
        }

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