const homeMW = (req, res, next) => {
    const number = typeof req.session.number == 'undefined' ? 0 : req.session.number;

    const html = 'Az aktuális szám: ' + number + '<br><br><button onclick="location.href=\'/increase\'">Aktuális szám növelése</button> <button onclick="location.href=\'/newSession\'">Új munkamenet indítása</button>';

    return res.send(html);
}

module.exports = homeMW;