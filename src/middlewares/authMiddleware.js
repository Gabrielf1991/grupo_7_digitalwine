const auth = (req, res, next) => {

    if(req.session.userLog){
        return next();
    }
    return res.redirect('/login');
}

module.exports = auth;