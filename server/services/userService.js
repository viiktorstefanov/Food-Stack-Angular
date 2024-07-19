require('dotenv').config();

const User = require("../models/user");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const tokenBlackList = new Set();

async function register(email, password, firstName, gender, height, weight, age, activity) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Email address is already taken')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        firstName,
        age,
        gender,
        height,
        weight,
        activity
    });

    return createTokens(user);

};

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    };

    const tokens = createTokens(user);

    return tokens;
};

async function logout(token) {
    tokenBlackList.add(token);
};

function createTokens(user) {

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        activity: user.activity,
        targetCalories: user.targetCalories,
        accessToken,
        refreshToken,
    };
};

function generateAccessToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '15m' });
};

function generateRefreshToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY);
}

function isTokenBlacklisted(token) {
    return tokenBlackList.has(token);
}

function parseToken(token) {
    if (tokenBlackList.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, secret);
}

async function getUserById(id) {
    return User.findById(id);
}

async function deleteUserById(id) {
    return User.findByIdAndDelete(id);
}

async function reset(email) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    
}

async function changeUserTargetCalories(userId, newTargetCalories) {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error('User not found');
    }

    user.targetCalories = newTargetCalories;

    const updatedUser = await user.save();

    return updatedUser;
};

module.exports = {
    register,
    login,
    logout,
    parseToken,
    getUserById,
    deleteUserById,
    isTokenBlacklisted,
    reset,
    changeUserTargetCalories
}