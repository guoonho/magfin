from flask import jsonify
from shared.models import db

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    addDate = db.Column(db.DateTime(), unique=False, nullable=False)
    
    def __repr__(self):
        return '<Name %r>' % self.name
    
    def toJSON(self):
        return {
                'Name': self.name,
                'Added': self.addDate.isoformat()
                }
