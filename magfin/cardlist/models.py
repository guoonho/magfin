from flask import jsonify
from shared.models import db
from card.models import Card

class CardList(db.Model):
    __tablename__ = 'cardlist'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    cards = db.relationship('Card', backref='cardlist', lazy=True)
    createDate = db.Column(db.DateTime(), unique=False, nullable=False)


