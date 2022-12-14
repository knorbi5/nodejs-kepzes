module.exports = (objRep) => {
    const {db, tweetModel, uuid} = objRep;

    return (req, res, next) => {
        // ha nem mentésben (POST kérésben) vagyunk
        if(typeof req.body.content == 'undefined') {
            return next();
        }

        // ha nem adott meg szöveget
        if(!req.body.content.length) {
            res.locals.error = "Kérem, adja meg a tweet szövegét!";
            return next();
        }

        // új létrehozása
        const tweet = {
            id: uuid.v4(),
            content: req.body.content,
            user_id: req.session.userid,
            create_date: new Date().toLocaleString()
        };

        tweetModel.insert(tweet);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/");
        });
    }
}