module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        bookModel.find({}, (err, result) => {
            if (err) {
                return res.json({ error: err });
            }

            return res.json(result);
        });
    }
}