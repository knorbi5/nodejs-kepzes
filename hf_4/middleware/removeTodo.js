module.exports = (objRep) => {
    const { db, todoModel } = objRep;

    return (req, res, next) => {
        // betöltjük a getTodoByIdMW által a res.locals objektumra helyezett todo példányt
        let todo = res.locals.todo;

        // eltávolítjuk a db-ből a betöltött példányt
        todoModel.remove(todo);

        // mentjük az adatbázis állapotát
        db.saveDatabase(err => {
            return res.status(200).json({ success: 'Sikeres törlés!' });
        });
    }
}