import os
from extension import app
from flask import jsonify,make_response, session, request
from db_reqs import *


@app.route('/api/auth/entrance', methods=['POST'])
def auth_login():
    resp = dict(request.json)
    username = resp['username']
    password = resp['password']
    check_entrance(username, password)


@app.route('api/auth/register', methods=['POST'])
def auth_register():
    resp = dict(request.json)
    username = resp['username']
    password = resp['password']
    region = resp['region']

if __name__ == '__main__':
    app.run(host=os.getenv('SERVER_HOST'), port=os.getenv('SERVER_PORT'))