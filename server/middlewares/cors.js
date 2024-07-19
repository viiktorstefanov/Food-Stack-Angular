module.exports = () => (req, res, next ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, F-Authorization, user');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
}