function hasUser() {
    return (req, res, next) => {
        if(req.headers.user) {
            next();
        }else {
            res.status(401).json({ message: 'Please log in'});
        } 
    } 
};

//check acessToken not user


function isGuest() {
    return (req, res, next) => {
       
        if(req.headers.user) {
            res.status(400).json({ message: 'You are already logged in'});
        }else {
            next();
        }
    }
};

module.exports = {
    hasUser,
    isGuest,
}