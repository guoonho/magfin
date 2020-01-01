const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    id: String,
    name: String,
    edition: String,
    listId: String
});

const cardListSchema = new Schema({
    id: String,
    name: String
});

const Card = mongoose.model('card', cardSchema);
const CardList = mongoose.model('cardList', cardListSchema);

module.exports = {
    Card,
    CardList
};
