module.exports = (objRep) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        res.locals.users = userModel.find();
        return next();
    }
}