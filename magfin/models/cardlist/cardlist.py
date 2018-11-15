from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from magfin.models.card.card import Card
from magfin.db_setup import Base
from datetime import datetime as date

class CardList(Base):
    __tablename__ = 'cardlist'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), unique=False)
    cards = relationship('Card', backref='cardlist', lazy='dynamic')
    createDate = Column(DateTime(), unique=False, nullable=False)

    def __init__(self, name=None, cards=None, createDate=None):
        self.name = name
        if cards == None:
            self.cards = []
        else:
            self.cards = cards
        if createDate == None:
            self.createDate = date.now()
        else:
            self.createDate = createDate

    def __repr__(self):
        return '<ID: {}, Name: {}, Cards: {}>'.format(self.id, self.name, self.cards)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
