module.exports = (objRep) => {
    const { db, todoModel } = objRep;

    return (req, res, next) => {
        // betöltjük a getTodoByIdMW által a res.locals objektumra helyezett todo példányt
        let todo = res.locals.todo;

        // ha van megadva todo, akkor felülírjuk a példány attribútumát
        if (req.body.todo) {
            todo.todo = req.body.todo;
        }

        // frissítjük az adatbázisban lévő példányt
        todoModel.update(todo);

        // mentjük az adatbázis állapotát
        db.saveDatabase(err => {
            return res.status(200).json({ success: 'Sikeres módosítás!' });
        });
    }
}