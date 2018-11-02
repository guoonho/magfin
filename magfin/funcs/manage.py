from flask import jsonify
from shared.models import db

def list_from_json(data):
    print(data)
    return jsonify(data)
