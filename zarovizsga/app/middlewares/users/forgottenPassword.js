module.exports = (objRep) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        // ha nincs folyamatban jelszóváltoztatás
        if(typeof req.body.email == 'undefined') {
            return next();
        }

        // kikeressük az érintett user rekordot
        const user = userModel.findOne({email: req.body.email});

        if(typeof user != 'undefined' && user) {
            // ha megtaláltuk a usert, legeneráljuk a jelszóváltoztatás linket
            console.log('localhost:6001/changepassword/' + user.secret);
            return next();
        }

        res.locals.error = "Nem található felhasználó ezzel az email címmel!";
        return next();
    }
}