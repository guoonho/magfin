from flask import jsonify, request
from shared.models import db
import json

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

def cards_from_dict(data):
    """Evalutes if the given dict has the necessary attributes to be represented as a CardList object.

    Args:
        param1 (data): The dict containing attributes 

    Returns:
        bool: True if the dict contains a valid structure to generate a CardList object.

    """


def list_from_req(req):
    card_array = eval_json_req(req)
    if card_array == None:
        return 'Invalid json received.'
    else:
        return jsonify(card_array)


