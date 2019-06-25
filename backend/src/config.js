const mongoose = require('mongoose');
const f = require('util').format;
mongoose.Promise = global.Promise;

const dbUser = 'root';
const dbPass = 'example';
const dbAuth = 'DEFAULT';
const url = 'mongodb://root:example@mongo:27017/magfin?authSource=admin';

mongoose.connect(url, { 
    useNewUrlParser: true
});
mongoose.connection.once('open', () => console.log('Connected to mongo at ${url}'));
