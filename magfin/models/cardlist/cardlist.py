from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from magfin.models.card.card import Card
from magfin.db_setup import Base

class CardList(Base):
    __tablename__ = 'cardlist'
    id = Column(Integer, primary_key=True)
    name = Column(String(150), unique=True, nullable=False)
    cards = relationship('Card', backref='cardlist', lazy=True)
    createDate = Column(DateTime(), unique=False, nullable=False)


