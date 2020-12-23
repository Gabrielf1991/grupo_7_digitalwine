 const authMiddleware = function (req, res, next){
    if (req.session.email) {
        return next();
    }
    res.redirect('/login');
 }

 module.exports = authMiddleware;