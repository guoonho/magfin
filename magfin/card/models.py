from flask import jsonify
from shared.models import db

#class CardList(db.Model):
#    __tablename__ = 'cardlist'
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(150), unique=True, nullable=False)
#    cards = db.relationship('Card', backref='cardlist', lazy=True)
#    createDate = db.Column(db.DateTime(), unique=False, nullable=False)

class Card(db.Model):
    __tablename__ = 'card'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    addDate = db.Column(db.DateTime(), unique=False, nullable=False)
    cardlist_id = db.Column(db.Integer, db.ForeignKey('cardlist.id'), nullable=False)

    
    def __repr__(self):
        return '<Name %r>' % self.name
    
    def toJSON(self):
        return {
                'Name': self.name,
                'Added': self.addDate.isoformat()
                }
