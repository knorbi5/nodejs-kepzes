module.exports = (objRep) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        if(typeof req.params.secret == 'undefined') {
            return next(new Error("hibás kérés!"));
        }

        // lekérdezzük az adott felhasználót secret key alapján
        res.locals.user = userModel.findOne({secret: req.params.secret});

        if(typeof res.locals.user != 'undefined' && res.locals.user) {
            return next();
        }

        return res.redirect("/");
    }
}