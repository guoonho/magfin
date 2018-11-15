from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from magfin.db_setup import Base

class Card(Base):
    __tablename__ = 'card'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), unique=False, nullable=False)
    addDate = Column(DateTime(), unique=False, nullable=False)
    cardlist_id = Column(Integer, ForeignKey('cardlist.id'))

    def __init__(self, name=None, cardlist_id=None, addDate=None):
        self.name = name
        self.cardlist_id = cardlist_id
        if addDate == None:
            self.addDate = DateTime.now()
        else:
            self.addDate = addDate
    
    def __repr__(self):
        return '<ID: {}, Name: {}, CardList ID: {}>'.format(self.id, self.name, self.cardlist_id)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
