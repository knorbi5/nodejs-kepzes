const increaseMW = (req, res, next) => {
    if (typeof req.session.number == 'undefined') {
        req.session.number = 1;
    } else {
        ++req.session.number;
    }

    return res.redirect('/');
}

module.exports = increaseMW;