const { register, login, logout, reset } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');

const authController = require('express').Router();

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
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

authController.post('/login', async(req, res) => {
    try {
        const userWithTokens = await login(req.body.email, req.body.password);
        res.json(userWithTokens).end();
        console.log(`User ${req.body.email} has logged in`);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message }).end();
    }
});

authController.get('/logout', async(req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        await logout(accessToken);
        console.log(`User has logged out`);
        res.status(204).end();
    } catch (error) {
            const message = parseError(error);
            res.status(401).json({ message }).end();
    }
});

authController.post('/forgot-password',
    body('email').isEmail().withMessage('Invalid email'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            
            await reset(req.body.email);
            
            res.status(200).json({ message: 'Password reset instructions sent to your email' }).end();
            
            console.log(`Password reset initiated for ${req.body.email}`);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            if (message.includes('\n')) {
                const errors = message.split('\n')
                return res.status(400).json({ message: errors }).end();
            }
            res.status(400).json({ message }).end();
        }
    });

module.exports = authController;
