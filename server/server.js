const express = require('express');
const axios = require('axios'); 
const { databaseConfig } = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
require('dotenv').config();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.get('/ping', (req, res) => {
        res.send('Server is alive');
    });

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST;
    
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));


    setInterval(() => {
        axios.get(`${HOST}/ping`)
            .then(response => console.log(`Keep-alive ping response: ${response.data}`))
            .catch(err => console.error('Error in keep-alive ping:', err));
    }, 14 * 60 * 1000);

}

start();

