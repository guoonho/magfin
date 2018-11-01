from shared.models import db

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Name %r>' % self.name
