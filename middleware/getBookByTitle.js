module.exports = (objRep) => {
    const {bookModel} = objRep;

    return (req, res, next) => {
        return res.json(bookModel.findOne({title: req.query.title}));
    }
}