const guestMiddleware = function (req, res, next){
    if(req.session.email == undefined){
        next();
    } else {
        res.redirect('/users/user');
    }


}
    module.exports = guestMiddleware;