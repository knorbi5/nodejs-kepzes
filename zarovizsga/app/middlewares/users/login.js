module.exports = (objRep) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        console.log(userModel.find());
        return next();
    }
}