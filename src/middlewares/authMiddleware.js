 const authMiddleware = function (req, res, next){
    if (req.session.email || req.cookies.email) {
        req.userEmail = req.session.email ? req.session.email : req.cookies.email;
        return next();
    }
    res.redirect('/login');
 }

 module.exports = authMiddleware;