from flask import Blueprint, abort, jsonify, request
from shared.models import db
from funcs.manage import *

api_cardlists = Blueprint('api_cardlists', '__name__')

@api_cardlists.route('/lists/', defaults={'page': 'index'})
@api_cardlists.route('/lists/add', methods=['POST'])
def lists_add():
    if request.method != 'POST':
        return abort(400)
    elif request.method == 'POST':
        if request.get_json() == None:
            return abort(400)
        else:
            return list_from_json(request.get_json())
    else:
        return abort(400)
