module.exports = (objRep) => {
    const {db, bookModel} = objRep;

    return (req, res, next) => {
        let book = res.locals.book;

        if(req.body.title) {
            book.title = req.body.title;
        }
        if(req.body.price) {
            book.price = req.body.price;
        }

        bookModel.update(book);

        db.saveDatabase(err => {
            return res.status(200).json({success: 'Adatok sikeresen módosítva!'});
        });
    }
}