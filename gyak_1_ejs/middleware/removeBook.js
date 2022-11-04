module.exports = (objRep) => {
    const {db, bookModel} = objRep;

    return (req, res, next) => {
        let book = res.locals.book;

        bookModel.remove(book);

        db.saveDatabase(err => {
            if(err) {
                return res.json({ error: err })
            }

            return res.redirect('/bookList');
        });
    }
}