module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        let updateData = {};

        if (req.body.title) {
            updateData.title = req.body.title;
        }
        if (req.body.price) {
            updateData.price = req.body.price;
        }

        bookModel.updateOne({ bookId: res.locals.book.bookId }, updateData, (err) => {
            if (err) {
                return res.json({ error: err });
            }

            return res.status(200).json({ success: 'Adatok sikeresen módosítva!' });
        });
    }
}