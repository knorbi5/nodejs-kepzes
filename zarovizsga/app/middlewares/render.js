module.exports = (objRep, viewName) => {
    return (req, res, next) => {
        return res.render(viewName, res.locals);
    }
}