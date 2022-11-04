module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        bookModel.findOne({ title: req.query.title }, (err, result) => {
            if (err) {
                return res.json({ error: err });
            }

            return res.json(result);
        });
    }
}