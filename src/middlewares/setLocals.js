module.exports = (req, res, next) => {

    res.locals.userLog = false;
    
    if (req.session.email) {
        res.locals.userLog = req.session.email;
        console.log(res.locals.userLog);
    }
    
    return next();
}