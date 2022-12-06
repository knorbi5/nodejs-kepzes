module.exports = (objRep) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        // ha nincs folyamatban belépés
        if(typeof req.body.email == 'undefined' || typeof req.body.password == 'undefined') {
            return next();
        }

        // ha belépés van folyamatban, kikeressük az érintett user rekordot
        const user = userModel.findOne({email: req.body.email, password: req.body.password});

        if(typeof user != 'undefined' && user) {
            // ha megtaláltuk a usert, betesszük a session-be
            req.session.userid = user.id;

            return req.session.save(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect("/");
            });
        }

        res.locals.error = "Hibás felhasználónév, vagy jelszó!";
        return next();
    }
}