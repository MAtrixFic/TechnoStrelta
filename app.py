import os
from extension import app, pg_host
from flask import jsonify, make_response, session, request
from dotenv import load_dotenv
load_dotenv()
from db_reqs import *
create_tables()


@app.route('/api/auth/entrance', methods=['POST'])
def auth_login():
    resp = dict(request.form)
    username = resp['username']
    password = resp['password']
    token = check_entrance(username, password)
    if token:
        return make_response({'token': token}, 200)
    else:
        return make_response({'reason': 'Неверный логин или пароль'}, 401)


@app.route('/api/auth/register', methods=['POST'])
def auth_register():
    resp = dict(request.form)
    username = resp['username']
    password = resp['password']
    region = resp['region']
    token = add_user(username, password, region)
    if token:
        return make_response({'token': token}, 200)
    else:
        return make_response({'reason': 'Пользователь с таким username уже существует'}, 409)

if __name__ == '__main__':
    app.run(host=os.getenv('SERVER_HOST'), port=os.getenv('SERVER_PORT'))