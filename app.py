from flask import jsonify, make_response, session, request
from dotenv import load_dotenv
load_dotenv()
from db_reqs import *
from json import loads


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
    mail = resp['email']
    avatar = request.files['avatar']
    uid = add_file_to_server(avatar)
    token = add_user(username, password, mail, uid)
    if token:
        return make_response({'token': token}, 200)
    else:
        return make_response({'reason': 'Пользователь с таким username или email уже существует'}, 409)


@app.route('/api/auth/generateConfirmationCode', methods=['POST'])
def confirm_email():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        generate_confirmation_code(decoded_token)
        send_confirm_email(decoded_token)
        return make_response({'status': 'Success'}, 200)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


# @app.route('/api/auth/sendConfirmationCode', methods=['POST'])
# def send_confirmation_code():
#     resp = dict(request.form)
#     token = resp['token']
#     decoded_token = check_token(token)
#     if decoded_token:
#         send_confirm_email(decoded_token)
#         return make_response({'status': 'Success 200'}, 200)
#     else:
#         return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/auth/checkConfirmationCode', methods=['POST'])
def check_confirm_code():
    resp = dict(request.form)
    token = resp['token']
    confirm_code = resp['confirmationCode']
    decoded_token = check_token(token)
    if decoded_token:
        if check_confirmation_code(decoded_token, confirm_code):
            return make_response({'status': 'Success'}, 200)
        else:
            return make_response({'reason': 'Неверный код либо срок действия кода истек'}, 400)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/add/photo', methods=['POST'])
def add_media_photo():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        file = request.files['file']
        uid = add_file_to_server(file)
        # file = resp['file']
        title = resp['title']
        tags = loads(resp['tags'])
        metadata = loads(resp['metadata'])
        coords = resp['coordinates']
        username_id = decoded_token['id']
        if 'album_id' in resp:
            album_id = resp['album_id']
            if check_access_album(username_id, album_id):
                add_media_to_album(uid, tags, metadata, coords, title, username_id, album_id)
            else:
                return make_response({'reason': "У пользователя нет доступа к данному альбому"}, 403)
        else:
            gallery_id = get_user_by_id(username_id)['gallery_id']
            if check_access_gallery(username_id, gallery_id):
                add_media_to_gallery(uid, tags, metadata, coords, title, username_id, gallery_id)
            else:
                return make_response({'reason': "У пользователя нет доступа к данной галерее"}, 403)
        return make_response({'status': 'Success 201'}, 201)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/add/video', methods=['POST'])
def add_media_video():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        file = request.files['file']
        uid = add_file_to_server(file)
        # file = resp['file']
        title = resp['title']
        tags = loads(resp['tags'])
        username_id = decoded_token['id']
        if 'album_id' in resp:
            album_id = resp['album_id']
            if check_access_album(username_id, album_id):
                add_video_to_album(uid, tags, title, username_id, album_id)
            else:
                return make_response({'reason': "У пользователя нет доступа к данному альбому"}, 403)
        else:
            gallery_id = get_user_by_id(username_id)['gallery_id']
            if check_access_gallery(username_id, gallery_id):
                add_video_to_gallery(uid, tags, title, username_id, gallery_id)
            else:
                return make_response({'reason': "У пользователя нет доступа к данной галерее"}, 403)
        return make_response({'status': 'Success 201'}, 201)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/createAlbum', methods=['POST'])
def create_album():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        username_id = decoded_token['id']
        title = resp['title']
        isPublic = resp['isPublic']
        if isPublic == 'true':
            isPublic = True
        else:
            isPublic = False
        add_album_to_db(username_id, title, isPublic)
        return make_response({'status': 'Success 201'}, 201)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/addUserToAlbum', methods=['PATCH'])
def add_user_to_album():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        author = decoded_token['id']
        album_id = resp['album_id']
        user_id = resp['user_id']
        if add_user_to_album_db(author, album_id, user_id):
            return make_response({'status': 'Success 200'}, 200)
        else:
            return make_response({'reason': 'У вас нет доступа к этому альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/deleteUserFromAlbum', methods=['PATCH'])
def delete_user_from_album():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        author = decoded_token['id']
        album_id = resp['album_id']
        user_id = resp['user_id']
        if delete_user_from_album_db(author, album_id, user_id):
            return make_response({'status': 'Success 200'}, 200)
        else:
            return make_response({'reason': 'У вас нет доступа к этому альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/renameAlbum', methods=['PATCH'])
def rename_album():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        album_id = resp['album_id']
        user_id = decoded_token['id']
        new_title = resp['new_title']
        if check_access_album(user_id, album_id):
            if rename_album_db(album_id, new_title):
                return make_response({'status': 'Success 200'}, 200)
            return make_response({'reason': 'Ошибка на сервере'}, 500)
        return make_response({'reason': 'У вас нет доступа к этому альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/deleteAlbum', methods=['POST'])
def delete_album():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        album_id = resp['album_id']
        user_id = decoded_token['id']
        if check_access_album(user_id, album_id):
            if delete_album_db(album_id):
                return make_response({'status': 'Success 200'}, 200)
            return make_response({'reason': 'Ошибка на сервере'}, 500)
        return make_response({'reason': 'У вас нет доступа к этому альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/updateMedia', methods=['PATCH'])
def update_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        media_id = resp['media_id']
        user_id = decoded_token['id']
        new_file = resp['new_file']
        new_uid = add_file_to_server(new_file)
        new_meta = resp['new_meta']
        new_coords = resp['new_coords']
        new_tags = resp['new_tags']
        new_title = resp['new_title']
        if check_access_media(media_id, user_id):
            if update_media_db(media_id, new_uid, new_meta, new_coords, new_tags, new_title):
                return make_response({'status': 'Success 200'}, 200)
        return make_response({'reason': 'Неизвестный id медиа,   либо у вас нет к нему доступа'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/addTagToMedia', methods=['PATCH'])
def add_tag_to_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        media_id = resp['media_id']
        new_tag = resp['tag']
        user_id = decoded_token['id']
        if check_access_media(media_id, user_id):
            if add_tag_to_media_db(media_id, new_tag):
                return make_response({'status': 'Success 200'}, 200)
        return make_response({'reason': 'Неизвестный id медиа, либо у вас нет к нему доступа'})
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/deleteTagFromMedia')
def delete_tag_from_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        media_id = resp['media_id']
        user_id = decoded_token['id']
        tag = resp['tag']
        if check_access_media(media_id, user_id):
            if delete_tag_from_media_db(media_id, tag):
                return make_response({'status': 'Success 200'}, 200)
        return make_response({'reason': 'Неизвестный id медиа, либо у вас нет к нему доступа'})
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/deleteMedia', methods=['PATCH'])
def delete_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        media_id = resp['media_id']
        user_id = decoded_token['id']
        if check_access_media(media_id, user_id):
            if delete_media_db(media_id):
                return make_response({'status': 'Success 200'}, 200)
        return make_response({'reason': 'Неизвестный id медиа, либо у вас нет к нему доступа'})
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


# @app.route('/api/media/addFile', methods=['POST'])
# def add_file():
#     resp = dict(request.form)
#     token = resp['token']
#     decoded_token = check_token(token)
#     if decoded_token:
#         uid = uuid.uuid1()
#         file = request.files['file']
#
#     else:
#         return make_response({'reason': 'Недействительный токен'}, 403)
#
#
# @app.route('/api/media/addData')
# def add_file_data():
#     pass


@app.route('/api/media/getTags')
def get_tags():
    tags = get_tags_db()
    if tags is not False:
        return make_response(tags, 200)
    else:
        return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)


@app.route('/api/media/getPublicAlbums')
def get_public_albums():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        albums = get_albums_db(decoded_token['id'])
        if albums is not False:
            return make_response(albums, 200)
        else:
            return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getUsersAlbums')
def get_users_albums():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        user_id = resp['user_id']
        albums = get_albums_db(decoded_token['id'], user_id)
        if albums is not False:
            return make_response(albums, 200)
        else:
            return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getPublicMedias')
def get_public_medias():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        medias = get_medias_db(decoded_token['id'])
        if medias is not False:
            return make_response(medias, 200)
        else:
            return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getUsersMedia')
def get_users_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        user_id = resp['user_id']
        medias = get_medias_db(decoded_token['id'], user_id)
        if medias is not False:
            return make_response(medias, 200)
        else:
            return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getAlbumsMedia')
def get_albums_media():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        album_id = resp['album_id']
        if check_access_album(decoded_token['id'], album_id):
            medias = get_albums_media_db(album_id)
            if medias is not False:
                return make_response(medias, 200)
            else:
                return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
        else:
            return make_response({'reason': 'У пользователя нет доступа к альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getAlbumMembers')
def get_album_members():
    resp = dict(request.form)
    token = resp['token']
    decoded_token = check_token(token)
    if decoded_token:
        album_id = resp['album_id']
        if check_access_album(decoded_token['id'], album_id):
            members = get_album_members_db(album_id)
            if members is not False:
                return make_response(members, 200)
            else:
                return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)
        else:
            return make_response({'reason': 'У пользователя нет доступа к альбому'}, 403)
    else:
        return make_response({'reason': 'Недействительный токен'}, 403)


@app.route('/api/media/getUsers')
def get_users():
    users = get_users_db()
    if users is not False:
        return make_response(users, 200)
    else:
        return make_response({'reason': 'Я хз лол, ошибка какая-то'}, 500)


if __name__ == '__main__':
    create_tables()
    # add_user('yellowMonkey', 'password', 'kek.mitroshin@ya.ru' )
    app.run(host=os.getenv('SERVER_HOST'), port=os.getenv('SERVER_PORT'))
