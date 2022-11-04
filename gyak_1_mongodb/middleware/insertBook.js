module.exports = (objRep) => {
    const { bookModel, uuid } = objRep;

    return (req, res, next) => {
        const newBook = {
            bookId: uuid.v4(),
            title: req.body.title,
            price: req.body.price
        };

        bookModel.create(newBook, (err) => {
            if (err) {
                return res.json({ error: err });
            }

            return res.status(200).json({ success: 'Rekord sikeresen hozzáadva!' });
        });
    }
}