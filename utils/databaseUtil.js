const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb+srv://ashishraj615:Ashish000$@pccomplaints.covxsm3.mongodb.net/?retryWrites=true&w=majority&appName=PCcomplaints';

const mongoConnect = (callback) => {
    MongoClient.connect(mongoUrl).then((client) => {
    console.log('Database connected successfully',client);
    callback(client);
    }).catch((err) => {
    console.log('Error while connecting to database', err);
    });
}

module.exports = mongoConnect;