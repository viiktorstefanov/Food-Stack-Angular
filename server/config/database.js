const mongoose = require('mongoose');

const databaseConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database is successfully connected.');
    } catch(err) {
        console.log('Error with initializing database.');
        console.log(err.message);
        process.exit(1);
    }
}; 

module.exports = { databaseConfig };