from flask import Blueprint, abort, jsonify, request
from magfin.funcs.manage import *

api_cardlists = Blueprint('api_cardlists', '__name__')

@api_cardlists.route('/lists/', defaults={'page': 'index'})
@api_cardlists.route('/lists/add', methods=['POST'])
def lists_add():
    if request.method != 'POST':
        return abort(400)
    elif request.method == 'POST':
        return cardlist_add(request)
    else:
        return abort(400)

@api_cardlists.route('/lists/modify', methods=['POST'])
def lists_modify():
    if request.method != 'POST':
        return abort(400)
    elif request.method == 'POST':
        return cardlist_modify(request)
    else:
        return abort(400)

@api_cardlists.route('/lists/delete', methods=['POST'])
def lists_delete():
    if request.method != "POST":
        return abort(400)
    elif request.method == "POST":
        return cardlist_delete(request)
    else:
        return abort(400)

@api_cardlists.route('/lists/getAll', methods=['GET'])
def lists_getAll():
    if request.method != "GET":
        return abort(400)
    elif request.method == "GET":
        return cardlist_getAll()
    else:
        return abort(400)

@api_cardlists.route('/lists/get/<listID>', methods=['GET'])
def lists_getID(listID):
    if request.method != "GET":
        return abort(400)
    elif request.method == "GET":
        return cardlist_getID(listID)
    else:
        return abort(400)
