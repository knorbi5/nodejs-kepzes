module.exports = (objRep) => {
    const { bookModel } = objRep;

    return (req, res, next) => {
        return res.render('bookList', { books: bookModel.find() });
    }
}