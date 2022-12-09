module.exports = (objRep) => {
    const {userModel, uuid, db} = objRep;

    return (req, res, next) => {
        // ha nem mentésben (POST kérésben) vagyunk
        if(typeof req.body.email == 'undefined' || typeof req.body.password == 'undefined' || typeof req.body.password_repeat == 'undefined') {
            return next();
        }

        // ha nem adott meg e-mail címet
        if(!req.body.email.length) {
            res.locals.error = "Kérem adjon meg e-mail címet!";
            return next();
        }

        // van-e már ilyen email címmel user
        const userCheck = userModel.findOne({email: req.body.email});
        if(userCheck) {
            res.locals.error = "Ezzel az e-mail címmel már van regisztrált felhasználó, kérem válasszon másikat!";
            return next();
        }

        // ha nem adott meg jelszót
        if(!req.body.password.length) {
            res.locals.error = "Kérem adjon meg jelszót!";
            return next();
        }

        // ha nem egyeznek meg a megadott jelszavak
        if(req.body.password != req.body.password_repeat) {
            res.locals.error = "A jelszavak nem egyeznek meg!";
            return next();
        }

        // új user létrehozása
        const user = {
            id: uuid.v4(),
            email: req.body.email,
            password: req.body.password,
            create_date: new Date().toLocaleString(),
            secret: uuid.v4()
        };

        userModel.insert(user);
        
        db.saveDatabase(err => {
            if(err) {
                return next(err);
            }

            return res.redirect("/login");
        });
    }
}