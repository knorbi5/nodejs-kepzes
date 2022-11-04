module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        // megnézzük, hogy van-e id a kérésben
        if (typeof req.params.id === 'undefined') {
            return res.status(400).json({ error: 'wrong request! (missing id)' });
        }

        // betöltjük az id-hoz tartozó bookmodelt
        const book = bookModel.findOne({ bookId: req.params.id }, (err, result) => {
            // megnézzük, hogy van-e ilyen bookmodel
            if (typeof result == 'undefined' || result == null) {
                return res.status(404).json({ error: 'book not found! (id: ' + req.params.id + ')' });
            }

            // felfűzzük a res.locals-ra a lekérdezett bookmodelt
            res.locals.book = result;

            // következő middleware hívása
            return next();
        });
    }
}