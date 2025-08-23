const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb+srv://ashishraj615:Ashish000$@pccomplaints.covxsm3.mongodb.net/?retryWrites=true&w=majority&appName=PCcomplaints';

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(mongoUrl).then((client) => {
    console.log('Database connected successfully',client);
    callback();
    _db = client.db();
    }).catch((err) => {
    console.log('Error while connecting to database', err);
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No database found!');
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;