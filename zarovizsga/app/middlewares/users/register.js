module.exports = (objRep) => {
    const {userModel, uuid, db} = objRep;

    return (req, res, next) => {
        // ha nem mentésben (POST kérésben) vagyunk
        if(typeof req.body.email == 'undefined' || typeof req.body.password == 'undefined' || typeof req.body.password_repeat == 'undefined') {
            return next();
        }

        // ha nem egyeznek meg a megadott jelszavak
        if(req.body.password != req.body.password_repeat) {
            return res.redirect("/register");
        }

        // új user létrehozása
        const user = {
            id: uuid.v4(),
            email: req.body.email,
            password: req.body.password,
            create_date: new Date().toLocaleString()
        };

        userModel.insert(user);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/");
        });
    }
}