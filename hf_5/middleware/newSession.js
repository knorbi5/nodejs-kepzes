const newSessionMW = (req, res, next) => {
    // új session-t inicializálunk
    req.session.regenerate(err => {
        if (err) {
            console.log(err);
        }

        return res.redirect('/');
    });
}

module.exports = newSessionMW;