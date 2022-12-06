module.exports = (objRep) => {
    return (req, res, next) => {
        // ha nincs bejelentkezve, akkor átirányítjuk a belépésre
        if (typeof req.session.userid === 'undefined') {
            return res.redirect("/login");
        }

        return next();
    }
}