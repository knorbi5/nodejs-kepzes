module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        let book = res.locals.book;

        bookModel.deleteOne(book, (err) => {
            if (err) {
                return res.json({ error: err });
            }

            return res.status(200).json({ success: 'Sikeres törlés!' });
        });
    }
}