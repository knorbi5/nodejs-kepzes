module.exports = (objRep) => {
    const { todoModel } = objRep;

    return (req, res, next) => {
        // megnézzük, hogy van-e id a kérésben
        if (typeof req.params.id === 'undefined') {
            return res.status(400).json({ error: 'wrong request! (missing id)' });
        }

        // betöltjük az id-hoz tartozó todomodelt
        const todo = todoModel.findOne({ id: req.params.id });

        // megnézzük, hogy van-e ilyen todomodel
        if (typeof todo == 'undefined' || todo == null) {
            return res.status(404).json({ error: 'todo not found! (id: ' + req.params.id + ')' });
        }

        // felfűzzük a res.locals-ra a lekérdezett todomodelt
        res.locals.todo = todo;

        // következő middleware hívása
        return next();
    }
}