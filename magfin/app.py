from flask import Flask
from shared.models import db
from card.models import Card

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

def init_app(app):
    db.init_app(app)
    app.app_context().push()
    db.create_all()

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/card/add/<cname>')
def addCard(cname):
    card = Card(name=cname)
    db.session.add(card)
    db.session.commit()
    return 'Attempted to add card %s' % cname

@app.route('/card/get/<cname>')
def getCard(cname):
    print(Card.query.all())
    return 'Blah'

if __name__ == "__main__":
    init_app(app)
    app.run(host='0.0.0.0')
