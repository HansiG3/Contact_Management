const { MongoClient } = require('mongodb');
let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.MONGO_URI)
            .then((client) => {
                console.log('Connection successful');
                dbConnection = client.db('contact'); // Explicitly passing the database name
                return cb();
            })
            .catch((err) => {
                console.log('Connection error:', err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};