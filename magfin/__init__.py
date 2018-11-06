from flask import Flask
from magfin import funcs
from magfin.views.api.cards import api_cards

# DB
from magfin.db_setup import init_db

app = Flask(__name__)
app.register_blueprint(api_cards)
init_db()
