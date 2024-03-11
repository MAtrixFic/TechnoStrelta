import os
from extension import app, pg_host
from flask import jsonify, make_response, session, request
from dotenv import load_dotenv
load_dotenv()
from db_reqs import *
import smtplib
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
    mail = resp['email']
    avatar = resp['avatar']
    token = add_user(username, password, region, mail, avatar)
    if token:
        return make_response({'token': token}, 200)
    else:
        return make_response({'reason': 'Пользователь с таким username уже существует'}, 409)


@app.route('/api/auth/generateConfirmationCode', methods=['POST'])
def confirm_email():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        generate_confirmation_code(decoded_token)
        return 200
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/auth/sendConfirmationCode', methods=['POST'])
def send_confirmation_code():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        send_confirm_email(decoded_token)
        return 200
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/auth/checkConfirmationCode', methods=['POST'])
def check_confirm_code():
    resp = dict(request.form)
    token = resp['token']
    confirm_code = resp['confirmationCode']
    decoded_token = check_token(token)
    if decoded_token:
        if check_confirmation_code(decoded_token, confirm_code):
            return 200
        else:
            return make_response({'reason': 'Неверный код либо срок действия кода истек'}, 400)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/add', methods=['POST'])
def add_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        file = resp['file']
        title = resp['title']
        tags = resp['tags']
        metadata = resp['metadata']
        coords = resp['coordinates']
        username_id = decoded_token['id']
        flag = resp['flag']
        if flag:
            album_id = resp['album_id']
        else:
            album_id = get_gallery_id(resp['album_id'])
        add_media_to_db(file, tags, metadata, coords, title, username_id, album_id)
        return 200
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)

if __name__ == '__main__':
    app.run(host=os.getenv('SERVER_HOST'), port=os.getenv('SERVER_PORT'))