module.exports = (objRep) => {
    const { db, todoModel, uuid } = objRep;

    return (req, res, next) => {
        // létrehozzuk az új példányt
        const newTodo = {
            id: uuid.v4(),
            todo: req.body.todo,
        };

        // beillesztjük a db-be
        todoModel.insert(newTodo);

        // mentjük az adatbázis állapotát
        db.saveDatabase(err => {
            return res.status(200).json({ success: 'Rekord sikeresen hozzáadva!' });
        });
    }
}