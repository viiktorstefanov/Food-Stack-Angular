const express = require('express');
const { databaseConfig } = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
require('dotenv').config();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
}

start();

