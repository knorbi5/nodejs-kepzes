module.exports = (objRep) => {
    const { todoModel } = objRep;

    return (req, res, next) => {
        // visszadjuk a db-ben szereplő összes todo példányt
        return res.json(todoModel.find());
    }
}