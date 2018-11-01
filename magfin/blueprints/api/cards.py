from flask import Blueprint, abort, jsonify
from datetime import date, datetime
from shared.models import db
from card.models import Card

api_cards = Blueprint('api_cards','__name__')

@api_cards.route('/card/', defaults={'page': 'index'})
@api_cards.route('/card/add/<card_name>')
def card_add(card_name):
    existTest = Card.query.filter_by(name=card_name).first()
    if existTest is None:
        card = Card(
                name=card_name,
                addDate=datetime.now()
                )
        db.session.add(card)
        db.session.commit()
        return 'Successfully added %s to the database.' % card_name
    else:
        return 'Card %s already exists in database.' % card_name

@api_cards.route('/card/getAll')
def card_getAll():
    return jsonify([i.toJSON() for i in Card.query.all()])
