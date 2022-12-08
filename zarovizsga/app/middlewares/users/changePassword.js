module.exports = (objRep) => {
    const {userModel, db, uuid} = objRep;

    return (req, res, next) => {
        res.locals.secret = req.params.secret;

        // ha nincs folyamatban jelszóváltoztatás
        if(typeof req.body.password == 'undefined') {
            return next();
        }

        if(typeof res.locals.user != 'undefined' && res.locals.user) {
            // megváltoztatjuk a jelszót
            res.locals.user.password = req.body.password;
            // frissítjük a titkos kulcsot (hogy többször ne lehessen használni az aktuálisat)
            res.locals.user.secret = uuid.v4();

            userModel.update(res.locals.user);

            db.saveDatabase(err => {
                if(err) {
                    return next(err);
                }
    
                // ha sikeresen megváltoztatta a jelszót, átirányítjuk a bejelentkezésre
                return res.redirect("/login");
            });
        }
    }
}