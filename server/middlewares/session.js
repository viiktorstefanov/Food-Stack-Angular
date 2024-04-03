const { parseToken } = require("../services/userService");

module.exports = () => (req, res, next) => {

    const token = req.headers['M-Authorization'];

    if(token) {
        try{
            const payload = parseToken(JSON.parse(token));
            req.user = payload;
            req.token = token;
        } catch(error) {
            return res.status(401).json({ message: 'Invalid authorization token'});
        }
    }
    next();
};