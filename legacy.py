from flask import Flask
from blueprints.api.cards import api_cards
from blueprints.api.cardlists import api_cardlists
from shared.models import db
from cardlist.models import CardList

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.register_blueprint(api_cards)
app.register_blueprint(api_cardlists)

def init_app(app):
    db.init_app(app)
    app.app_context().push()
    db.create_all()

if __name__ == "__main__":
    init_app(app)
    app.run(host='0.0.0.0')