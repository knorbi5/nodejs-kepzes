module.exports = (objRep) => {
    const {db, bookModel} = objRep;

    return (req, res, next) => {
        let book = res.locals.book;

        bookModel.remove(book);

        db.saveDatabase(err => {
            return res.status(200).json({success: 'Sikeres törlés!'});
        });
    }
}