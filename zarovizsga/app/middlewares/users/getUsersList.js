module.exports = (objRep) => {
    const {userModel, tweetModel} = objRep;

    return (req, res, next) => {
        // lekérdezzük az összes felhasználót
        res.locals.users = userModel.find();

        // hozzáfűzzük a közzétett tweetek számát
        res.locals.users.forEach((user) => {
            user.tweetCount = tweetModel.find({user_id: user.id}).length;
        });

        return next();
    }
}