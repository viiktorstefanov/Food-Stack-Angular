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

//only for registered users
const isAuthenticated = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        
        if (!accessToken || isTokenBlacklisted(accessToken)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        next();
    } catch (error) {
        console.error('Error occurred during token verification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    hasUser,
    isGuest,
    isAuthenticated
}