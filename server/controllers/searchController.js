const searchController = require('express').Router();

const { findByQuery } = require('../services/searchService');
const { parseError } = require('../utils/parseError');

searchController.get('/', async (req, res) => {
    try {
        if (!req.query || !req.query.item || req.query.length <= 0) {
            throw new Error('Missing information about searched item');
        }
        const query = req.query.item;
        const matches = await findByQuery(query);
        console.log('The search has ended');
        res.json(matches).end()
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

module.exports = searchController;