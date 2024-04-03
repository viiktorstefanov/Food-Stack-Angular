const { register, login, logout} = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');
const { isGuest, hasUser } = require('../middlewares/guards');

const authController = require('express').Router();

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    isGuest(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const userWithTokens = await register(req.body.email, req.body.password, req.body.firstName, req.body.gender, req.body.height, req.body.weight);
            res.json(userWithTokens).end();
            console.log(`new User ${req.body.email} registred`);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            if(message.includes('\n')) {
                const errors = message.split('\n')
               return res.status(400).json({ message: errors }).end();
            }
            res.status(400).json({ message }).end();
        }
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token).end();
        console.log(`User ${req.body.email} has logged in`);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message }).end();
    }
});

authController.get('/logout', hasUser(), async (req, res) => {
    const user = JSON.parse(req.headers.user);
    await logout(user.accessToken);
    console.log(`User has logout`);
    res.status(204).end();
});

module.exports = authController;
