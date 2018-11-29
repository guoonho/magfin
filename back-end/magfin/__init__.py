from flask import Flask
from flask_cors import CORS
from magfin import funcs
from magfin.views.api.cards import api_cards
from magfin.views.api.cardlists import api_cardlists

# DB
from magfin.db_setup import init_db

app = Flask(__name__)
CORS(app)
app.register_blueprint(api_cards)
app.register_blueprint(api_cardlists)
init_db()
