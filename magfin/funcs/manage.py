from flask import jsonify, request, abort
from magfin.db_setup import db_session
from magfin.models.cardlist.cardlist import CardList
from magfin.models.card.card import Card
from datetime import date, datetime
import json
import traceback

def eval_json_req(req):
    """Evaluates whether the data from a request is valid json.

    Args:
        param1 (request): the request with valid json data to be validated.

    Returns:
        dict: The json object converted into a dict.
    
    """
    try:
        print(req)
        json_data = req.get_json()
        return json_data
    except TypeError:
        return None

def checkValidID(model, objID):
    """Queries the given model for the given ID. Returns None if nothing found, else returns the
    object itself.

    Args:
        param1 (model): The sqlalchemy class to be queried
        id (int): The ID of the object

    Returns:
        model: An existing object in the DB with the matching given ID.
        None: This, if no existing object is found.

    """
    try:
        obj = model.query.filter(CardList.id == objID).first()
        if obj != None:
            return obj
    except:
        return None
    return None

def cards_from_dict(data, cardListID):
    """Evalutes if the given dict has the necessary attributes to be represented as a CardList object.

    Args:
        param1 (data): The dict containing attributes 

    Returns:
        bool: True if the dict contains a valid structure to generate a CardList object.

    """
    try:
        card = Card(
                name=data['name'],
                addDate=datetime.now(),
                cardlist_id=cardListID
                )
        return card
    except:
        traceback.print_exc()
        return None


def cardlist_add(req):
    """Attempts to create a CardList object and commit it to the DB given a valid request.

    Args:
        param1 (request): Flask request object containing data structured in JSON

    Returns:
        response: A flask response object ready to serve.
    """
    card_array = eval_json_req(req)
    if card_array == None:
        return 'Invalid json received.'
    else:
        cardList = CardList(
                        name=card_array['name'],
                        cards=[],
                        createDate = datetime.now()
                )
        try:
            db_session.add(cardList)
            db_session.commit()
            query = CardList.query.filter(CardList.id == cardList.id).first()
            return jsonify({
                    "id": query.id,
                    "name": query.name,
                    "cards": []
                })
        except:
            traceback.print_exc()
            return 'Something went wrong in adding cardlist.'

def cardlist_modify(req):
    """Attempts to modify an existing CardList object given a request object containing a valid ID to map
    to the specific CardList that needs to be modified. (in JSON)

    The expected JSON looks like this:
        {
            "id": id
            "cards": [
                {
                    "name": cardName
                },... (more cards)
            ]
        }

    Args:
        param1 (request): Flask request object containing data structured in JSON

    Returns:
        response: A flask response object ready to serve.
    """
    card_array = eval_json_req(req)
    if card_array == None:
        return 'Invalid json received'
    else: 
        existingList = checkValidID(CardList, card_array['id'])
        if existingList == None:
            return abort(400)
        cardList = []
        for card in card_array['cards']:
            newCard = Card(
                    name = card['name'],
                    addDate = datetime.now(),
                    cardlist_id = card_array['id']
                    )
            cardList.append(newCard)
            existingList.cards = cardList
            db_session.add(existingList)
            db_session.commit()
            test = CardList.query.filter(CardList.id == existingList.id).first()
            print(test)
        return 'blah'

def cardlist_getAll():
    try:
        cardlists = []
        #query = CardList.query.join(CardList.cards).all()
        query = CardList.query.all()
        for cardlist in query:
            cardlists.append(cardlist.as_dict())
        return jsonify(cardlists)
    except:
        traceback.print_exc()
        return abort(400)
    return abort(400)

