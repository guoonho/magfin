from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from magfin.db_setup import Base

#class CardList(db.Model):
#    __tablename__ = 'cardlist'
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(150), unique=True, nullable=False)
#    cards = db.relationship('Card', backref='cardlist', lazy=True)
#    createDate = db.Column(db.DateTime(), unique=False, nullable=False)

class Card(Base):
    __tablename__ = 'card'
    id = Column(Integer, primary_key=True)
    name = Column(String(150), unique=True, nullable=False)
    addDate = Column(DateTime(), unique=False, nullable=False)
    cardlist_id = Column(Integer, ForeignKey('cardlist.id'), nullable=False)

    
    def __repr__(self):
        return '<Name %r>' % self.name
    
    def toJSON(self):
        return {
                'Name': self.name,
                'Added': self.addDate.isoformat()
                }
