#from flask_sqlalchemy import SQLAlchemy
#db = SQLAlchemy()

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:////usr/src/app/magfin.db', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import magfin.models.card.card
    import magfin.models.cardlist.cardlist
    Base.metadata.create_all(bind=engine)
