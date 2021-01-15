const guestMiddleware = function (req, res, next){
    if(!req.session.email){
        return next();
    } 
    
    return res.redirect('/');


}
    module.exports = guestMiddleware;