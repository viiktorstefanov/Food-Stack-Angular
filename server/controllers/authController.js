const { register, login, logout, reset, changeUserTargetCalories } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/parseError');
const { isGuest, hasUser } = require('../middlewares/guards');

const authController = require('express').Router();

authController.post('/register',
    isGuest(),
    body('email').isEmail().withMessage('Enter a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Enter a password with a minimum of 8 characters.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const userWithTokens = await register(req.body.email, req.body.password, req.body.firstName, req.body.gender, req.body.height, req.body.weight, +req.body.age, +req.body.activity);
            res.json(userWithTokens).end();
            console.log(`User ${req.body.email} successfully registered.`);
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

authController.post('/login', isGuest(), async(req, res) => {
    try {
        const userWithTokens = await login(req.body.email, req.body.password);
        res.json(userWithTokens).end();
        console.log(`${req.body.email} has successfully signed in.`);
    } catch (error) {
        const message = parseError(error);
    console.log(message);
    if (message.includes("\n")) {
      const errors = message.split("\n");
      return res.status(400).json({ message: errors }).end();
    }
    res.status(400).json({ message }).end();
    }
});

authController.get('/logout', hasUser(), async(req, res) => {
    try {
        const user = JSON.parse(req.headers.user);
        const accessToken = req.headers.authorization?.split(' ')[1];
        await logout(accessToken);
        console.log(`${user.email} has signed out.`);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        if (message.includes("\n")) {
          const errors = message.split("\n");
          return res.status(400).json({ message: errors }).end();
        }
        res.status(400).json({ message }).end();
    }
});

authController.post('/forgot-password',
    isGuest(),
    body('email').isEmail().withMessage('Invalid email'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            
            await reset(req.body.email);
            
            res.status(200).json({ message: 'Password reset instructions sent to your email' }).end();
            
            console.log(`A password reset has been requested for ${req.body.email}.`);
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

authController.post('/target/:id',
        async (req, res) => {
            try {
                const userId = req.params.id;
                const user = JSON.parse(req.headers.user);
                const newTargetCalories = Number(req.body.targetCalories);
                const updatedUser = await changeUserTargetCalories(userId, newTargetCalories);
                res.json(updatedUser).end();
                console.log(`${user.email} successfully set a new target for calories.`);
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

module.exports = authController;
