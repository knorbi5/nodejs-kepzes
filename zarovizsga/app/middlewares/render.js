module.exports = (objRep, viewName) => {
    const {userModel} = objRep;

    return (req, res, next) => {
        // be van-e lépve
        res.locals.loggedinUser = null;

        if(typeof req.session.userid != 'undefined') {
            const user = userModel.findOne({id: req.session.userid});
            res.locals.loggedinUser = user;
        }

        return res.render(viewName, res.locals);
    }
}