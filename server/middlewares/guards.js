function hasUser() {
    return (req, res, next) => {
        if(req.headers.user) {
            next();
        }else {
            res.status(401).json({ message: 'Sign in to proceed'});
        } 
    } 
};

function isGuest() {
    return (req, res, next) => {
       
        if(req.headers.user) {
            res.status(400).json({ message: 'You are already signed in.'});
        }else {
            next();
        }
    }
};

module.exports = {
    hasUser,
    isGuest,
}