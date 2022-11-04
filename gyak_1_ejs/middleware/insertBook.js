module.exports = (objRep) => {
    const {db, bookModel, uuid} = objRep;

    return (req, res, next) => {
        if(typeof req.body.title == 'undefined' || typeof req.body.price == 'undefined' || !req.body.title || !req.body.price) {
            return res.json({"error": "Hiányzó form adatok!"});
        }

        const newBook = {
            bookId: uuid.v4(),
            title: req.body.title,
            price: req.body.price
        };
        
        bookModel.insert(newBook);
        
        db.saveDatabase(err => {
            if(err) {
                return res.json({ error: err })
            }
            
            return res.redirect('/bookList');
        });
    }
}