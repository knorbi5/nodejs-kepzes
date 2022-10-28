module.exports = (objRep) => {
    const {db, bookModel, uuid} = objRep;

    return (req, res, next) => {
        const newBook = {
            bookId: uuid.v4(),
            title: req.body.title,
            price: req.body.price
        };
        
        bookModel.insert(newBook);
        
        db.saveDatabase(err => {
            return res.status(200).json({success: 'Rekord sikeresen hozzáadva!'});
        });
    }
}