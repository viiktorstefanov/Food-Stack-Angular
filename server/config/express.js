const express = require('express');
const cors = require('../middlewares/cors');
const trimBody = require('../middlewares/trimBody');
const session = require('../middlewares/session');
const throating = require('../middlewares/throating');

module.exports = (app) => {
    
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    
    //FOR THROATING FROM SERVER
    // app.use(throating());   
}