import psycopg2
import dotenv
import os
from bcrypt import checkpw, hashpw
from extension import salt
from jwt import encode, decode
from datetime import datetime, timedelta
from extension import app
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import uuid
from PIL import Image


dotenv.load_dotenv()

# print(os.getenv('PG_DATABASE'), os.getenv('PG_USERNAME'), os.getenv('PG_PASSWORD'), os.getenv('PG_PORT'))

# if os.getenv('HUYNYA'):
#     pg_host = 'localhost'
# else:
#     pg_host = 'postgres'
pg_host = 'localhost' # os.getenv('PG_HOST')
conn = psycopg2.connect(database=os.getenv('PG_DATABASE'), user=os.getenv('PG_USERNAME'),
                        password=os.getenv('PG_PASSWORD'), host=pg_host,
                        port=os.getenv('PG_PORT'))


def create_tables():
    curs = conn.cursor()
    curs.execute('''CREATE TABLE IF NOT EXISTS Users(
                      id serial primary key,
                      username TEXT UNIQUE,
                      email TEXT UNIQUE,
                      pass_hash TEXT
                    );
                    
                    CREATE TABLE IF NOT EXISTS Gallerys(
                      id serial primary key
                    );
                    
                    CREATE TABLE IF NOT EXISTS Albums(
                      id serial primary key,
                      name TEXT,
                      isPublic BOOLEAN
                    );
                    
                    CREATE TABLE IF NOT EXISTS GalleryAlbums(
                      id serial primary key,
                      gallery_id INTEGER REFERENCES Gallerys(id),
                      album_id INTEGER REFERENCES Albums(id)
                    );
                    
                    CREATE TABLE IF NOT EXISTS Medias(
                      id serial primary key,
                      title TEXT,
                      uuid TEXT,
                      coordinates TEXT
                    );
                    
                    CREATE TABLE IF NOT EXISTS Tags(
                      id serial primary key,
                      title TEXT
                    );
                    
                    CREATE TABLE IF NOT EXISTS Mediatags(
                      id serial primary key,
                      media_id INTEGER REFERENCES Medias(id),
                      tag_id INTEGER REFERENCES Tags(id)
                    );
                    
                    CREATE TABLE IF NOT EXISTS Metadatas(
                      id serial primary key,
                      create_timestamp INTEGER,
                      author_id INTEGER REFERENCES Users(id),
                      city TEXT
                    );
                    
                    CREATE TABLE IF NOT EXISTS AlbumMedias(
                      id serial primary key,
                      album_id INTEGER REFERENCES Albums(id),
                      media_id INTEGER REFERENCES Medias(id)
                    );
                    
                    CREATE TABLE IF NOT EXISTS GalleryMedias(
                      id serial primary key,
                      gallery_id INTEGER REFERENCES Gallerys(id),
                      media_id INTEGER REFERENCES Medias(id)
                    );
                    
                    CREATE TABLE IF NOT EXISTS UsersCodes(
                      id serial primary key, 
                      user_id INTEGER REFERENCES Users(id),
                      confirmation_code INTEGER,
                      created_at TEXT
                    );
                    ''')
    conn.commit()
    curs.execute('SELECT column_name FROM information_schema.columns WHERE table_name = \'users\'')
    resp = curs.fetchall()
    if ('gallery_id',) not in resp:
        curs.execute('ALTER TABLE Users ADD COLUMN '
                     'gallery_id INTEGER REFERENCES Gallerys(id);')
        conn.commit()
    curs.execute('SELECT column_name FROM information_schema.columns WHERE table_name = \'medias\'')
    resp = curs.fetchall()
    if ('metadata_id',) not in resp:
        curs.execute('ALTER TABLE Medias ADD COLUMN '
                     'metadata_id INTEGER REFERENCES Metadatas(id);')
        conn.commit()
    curs.execute('SELECT column_name FROM information_schema.columns WHERE table_name = \'users\'')
    resp = curs.fetchall()
    if ('avatar_id',) not in resp:
        curs.execute('ALTER TABLE Users ADD COLUMN '
                     'avatar_id INTEGER REFERENCES Medias(id);')
        conn.commit()
    curs.close()


def get_users_db():
    try:
        curs = conn.cursor()
        curs.execute('SELECT row_to_json(Users) FROM Users')
        resp = curs.fetchall()
        op = []
        for i in resp:
            op.append(i[0])
        return op
    except:
        return False


def get_user(username):
    curs = conn.cursor()
    curs.execute(f'SELECT row_to_json(Users) FROM Users WHERE username = \'{username}\'')
    resp = curs.fetchall()
    curs.close()
    if resp != []:
        return resp[0][0]
    else:
        return False


def generate_token(id, username, pass_hash):
    token = encode({
                        'id': id,
                        'username': username,
                        'pass_hash': pass_hash,
                        'expiration': str(datetime.utcnow() + timedelta(seconds=3600))
                    }, app.config['SECRET_KEY'])
    return token


def check_token(token):
    try:
        decoded_token = decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = decoded_token['username']
        pass_hash = decoded_token['pass_hash']
        if (datetime.utcnow() <= datetime.fromisoformat(decoded_token['expiration'])
                and get_user(username)['pass_hash'] == pass_hash):
            return decoded_token
        else:
            return False
    except:
        return False


def get_usernames_db():
    curs = conn.cursor()
    curs.execute('SELECT username FROM Users')
    resp = [i[0] for i in curs.fetchall()]
    curs.close()
    return resp


def get_emails_db():
    curs = conn.cursor()
    curs.execute('SELECT email FROM Users')
    resp = [i[0] for i in curs.fetchall()]
    curs.close()
    return resp


def check_entrance(username, password):
    if username in get_usernames_db():
        user = get_user(username)
        if checkpw(bytes(password, encoding='UTF-8'), bytes(user['pass_hash'], encoding='UTF-8')):
            return generate_token(user['id'], username, user['pass_hash'])
        else:
            return False
    else:
        return False


def add_user(username, password, mail, avatar):
    if username not in get_usernames_db() and mail not in get_emails_db():
        curs = conn.cursor()
        avatar_id = add_avatar(avatar)
        curs.execute(f'INSERT INTO Users(username, pass_hash, email, avatar_id) '
                     f'VALUES(\'{username}\', \'{str(hashpw(bytes(password, encoding="UTF-8"), salt))[2:-1]}\', '
                     f'\'{mail}\', {avatar_id})')
        conn.commit()
        curs.execute(f'INSERT INTO Gallerys DEFAULT VALUES RETURNING id')
        conn.commit()
        resp = curs.fetchall()[0][0]
        curs.execute(f'UPDATE Users SET gallery_id = {resp} WHERE username = \'{username}\'')
        conn.commit()
        curs.execute(f'SELECT row_to_json(Users) FROM Users WHERE username = \'{username}\'')
        resp = curs.fetchall()[0][0]
        curs.close()
        return generate_token(resp['id'], username, resp['pass_hash'])
    else:
        return False


def generate_confirmation_code(token):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT row_to_json(UsersCodes) FROM UsersCodes WHERE user_id = {token["id"]}')
        resp = curs.fetchall()
        seed_r = datetime.utcnow()
        random.seed = seed_r
        if resp == []:
            curs.execute(f'INSERT INTO UsersCodes (user_id, confirmation_code, created_at) VALUES '
                         f'(\'{token["id"]}\', {random.randint(100000, 999999)}, '
                         f'\'{str(datetime.utcnow() + timedelta(seconds=300))}\')')
            conn.commit()
        else:
            curs.execute(f'UPDATE UsersCodes SET confirmation_code = {random.randint(100000, 999999)}, '
                         f'created_at = \'{str(datetime.utcnow() + timedelta(seconds=300))}\''
                         f' WHERE user_id = \'{token["id"]}\'')
            conn.commit()
        curs.execute(f'SELECT confirmation_code FROM userscodes WHERE user_id = {token["id"]}')
        code = curs.fetchall()[0][0]
        curs.close()
        return code
    except:
        return False


def check_confirmation_code(token, confirmation_code):
    curs = conn.cursor()
    curs.execute(f'SELECT row_to_json(UsersCodes) FROM UsersCodes WHERE username_id = {token["id"]}')
    resp = curs.fetchall()
    curs.close()
    if resp['confirmation_code'] == confirmation_code and datetime.fromisoformat(resp['created_at']) < datetime.utcnow():
        return True
    else:
        return False


def send_confirm_email(token):
    try:
        email = 'tekhno.strelka@mail.ru'
        password = 'cCeTMHz7BTvLefbJcJ2K'
        smtp_server = 'smtp.mail.ru'
        smtp_port = 465
        server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        server.login(email, password)
        curs = conn.cursor()
        curs.execute(f'SELECT email FROM Users WHERE username = \'{token["username"]}\'')
        recipient = curs.fetchall()[0][0]
        confirmation_code = generate_confirmation_code(token)
        msg = MIMEMultipart('alternative')
        msg['Subject']  = 'Код подтверждения'
        msg['From'] = email
        msg['To'] = recipient
        msg.attach(MIMEText(f'Ваш код подтверждения:\n{confirmation_code}', 'plain'))
        server.send_message(msg)
        server.close()
        curs.close()
        return True
    except:
        return False


def add_avatar(uid):
    try:
        curs = conn.cursor()
        curs.execute(f'INSERT INTO Medias (uuid) VALUES(\'{uid}\') RETURNING id')
        resp = curs.fetchall()
        conn.commit()
        curs.close()
        return resp[0][0]
    except:
        return False


def check_for_tag_in_db(tag):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT id FROM tags WHERE title = \'{tag}\'')
        resp = curs.fetchall()
        curs.close()
        if resp == []:
            return False
        return resp[0][0]
    except:
        return False


def add_tag_to_db(tag):
    try:
        curs = conn.cursor()
        curs.execute(f'INSERT INTO tags (title) VALUES (\'{tag}\') RETURNING id')
        tag_id = curs.fetchall()[0][0]
        conn.commit()
        curs.close()
        return tag_id
    except:
        return False


def check_for_tag_in_media(media_id, tag_id):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT * FROM mediatags WHERE media_id = {media_id} AND tag_id = {tag_id}')
        resp = curs.fetchall()
        if resp == []:
            return False
        else:
            return True
    except:
        return False


def add_tag_to_media_db(media_id, tag):
    try:
        if not check_for_tag_in_db(tag):
            tag_id = add_tag_to_db(tag)
        else:
            tag_id = check_for_tag_in_db(tag)
        curs = conn.cursor()
        if not check_for_tag_in_media(media_id, tag_id):
            curs.execute(f'INSERT INTO mediatags (media_id, tag_id) VALUES ({media_id}, {tag_id})')
            conn.commit()
        return True
    except:
        return False


def add_media_to_db(uid, tags, metadata, coords, title, username_id):
    try:
        metadata_id = add_metadata_to_db(metadata, username_id)
        curs = conn.cursor()
        curs.execute(f'INSERT INTO Medias (uuid, metadata_id, coordinates, title) VALUES '
                     f'(\'{uid}\', {metadata_id}, \'{coords}\', \'{title}\') RETURNING id')
        media_id = curs.fetchall()[0][0]
        conn.commit()
        for i in tags:
            add_tag_to_media_db(media_id, i)
        # add_tags_to_media(tags, media_id)
        curs.close()
        return media_id
    except:
        return False


def add_metadata_to_db(metadata, username_id):
    try:
        curs = conn.cursor()
        curs.execute(f'INSERT INTO Metadatas (create_timestamp, city, author_id) VALUES '
                     f'({metadata["create_timestamp"]}, \'{metadata["city"]}\', {username_id}) RETURNING id')
        metadata_id = curs.fetchall()[0][0]
        conn.commit()
        curs.close()
        return metadata_id
    except:
        return False


def add_album_to_db(gallery_id, title, isPublic):
    try:
        curs = conn.cursor()
        curs.execute(f'INSERT INTO Albums (name, ispublic) VALUES (\'{title}\', {str(isPublic).lower()}) RETURNING id')
        album_id = curs.fetchall()[0][0]
        conn.commit()
        curs.execute(f'INSERT INTO GalleryAlbums (gallery_id, album_id) VALUES ({gallery_id}, {album_id})')
        conn.commit()
        curs.close()
        return album_id
    except:
        return False


def get_gallery_id(id):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT gallery_id FROM users WHERE id = {id}')
        resp = curs.fetchall()[0][0]
        curs.close()
        return resp
    except:
        return False


def add_media_to_gallery(file, tags, metadata, coords, title, username_id, gallery_id):
    try:
        media_id = add_media_to_db(file, tags, metadata, coords, title, username_id)
        curs = conn.cursor()
        curs.execute(f'INSERT INTO gallerymedias (gallery_id, media_id) VALUES ({gallery_id}, {media_id})')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def add_media_to_album(file, tags, metadata, coords, title, username_id, album_id):
    try:
        media_id = add_media_to_db(file, tags, metadata, coords, title, username_id)
        curs = conn.cursor()
        curs.execute(f'INSERT INTO albummedias (album_id, media_id) VALUES ({album_id}, {media_id})')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def check_access_gallery(username_id, gallery_id):
    curs = conn.cursor()
    curs.execute(f'SELECT gallery_id FROM users WHERE id = {username_id}')
    resp = curs.fetchall()
    curs.close()
    if resp != [] and resp[0][0] == int(gallery_id):
        return True
    else:
        return False


def check_access_album(username_id, album_id):
    curs = conn.cursor()
    curs.execute(f'SELECT album_id FROM galleryalbums WHERE gallery_id = '
                 f'(SELECT users.gallery_id from users where id = {username_id})')
    resp1 = curs.fetchall()
    curs.execute(f'SELECT ispublic FROM albums WHERE id = {album_id}')
    resp2 = curs.fetchall()
    curs.close()
    if (int(album_id),) in resp1 or resp2[0][0]:
        return True
    else:
        return False


def add_user_to_album_db(author_id, album_id, user_id):
    if check_access_album(author_id, album_id):
        if not check_access_album(user_id, album_id):
            curs = conn.cursor()
            curs.execute(f'INSERT INTO galleryalbums (gallery_id, album_id) VALUES ((SELECT gallery_id FROM users '
                         f'WHERE id = {user_id}), {album_id})')
            conn.commit()
            curs.close()
        return True
    else:
        return False


def delete_user_from_album_db(author_id, album_id, user_id):
    try:
        if check_access_album(author_id, album_id):
            if check_access_album(user_id, album_id):
                curs = conn.cursor()
                curs.execute(f'DELETE FROM galleryalbums WHERE album_id = {album_id} AND '
                             f'gallery_id = (SELECT album_id from users where id = {user_id})')
                conn.commit()
                curs.close()
            return True
    except:
        return False


def rename_album_db(album_id, new_title):
    try:
        curs = conn.cursor()
        curs.execute(f'UPDATE albums SET name = \'{new_title}\' WHERE id = {album_id}')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def delete_album_db(album_id):
    try:
        curs = conn.cursor()
        curs.execute(f'DELETE FROM albummedias WHERE album_id = {album_id} RETURNING media_id')
        medias_id = [i[0] for i in curs.fetchall()]
        conn.commit()
        for i in medias_id:
            delete_media_db(i)
        # curs.execute(f'DELETE FROM medias WHERE id IN ({", ".join([str(i[0]) for i in medias_id])}) RETURNING metadata_id')
        # metadatas_id = curs.fetchall()
        # conn.commit()
        # curs.execute(f'DELETE FROM metadatas WHERE id in ({", ".join([str(i[0]) for i in metadatas_id])})')
        # conn.commit()
        curs.execute(f'DELETE FROM galleryalbums WHERE album_id = {album_id}')
        conn.commit()
        curs.execute(f'DELETE FROM albums WHERE id = {album_id}')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def is_media_in_gallerys(media_id):
    curs = conn.cursor()
    curs.execute(f'SELECT gallery_id FROM gallerymedias WHERE media_id = {media_id}')
    resp = curs.fetchall()
    if resp == []:
        return False
    return resp[0][0]


def is_media_in_albums(media_id):
    curs = conn.cursor()
    curs.execute(f'SELECT album_id FROM albummedias WHERE media_id = {media_id}')
    resp = curs.fetchall()
    if resp == []:
        return False
    return resp[0][0]


def update_media_db(media_id, new_uid, new_meta, new_coords, new_tags, new_title):
    try:
        curs = conn.cursor()
        new_meta_id = add_metadata_to_db(new_meta)
        curs.execute(f'UPDATE medias SET uuid = \'{new_uid}\', metadatas_id = {new_meta_id}, '
                     f'coordinates = \'{new_coords}\', title = \'{new_title}\' WHERE id = {media_id}')
        curs.execute(f'DELETE FROM tags WHERE media_id = {media_id}')
        for i in new_tags:
            add_tag_to_media_db(media_id, i)
        conn.commit()
        curs.close()
        return True
    except:
        return False


def check_access_media(media_id, user_id):
    try:
        if is_media_in_gallerys(media_id):
            if check_access_gallery(user_id, is_media_in_gallerys(media_id)):
                return True
        elif is_media_in_albums(media_id):
            if check_access_album(user_id, is_media_in_albums(media_id)):
                return True
        return False
    except:
        return False


def delete_tag_from_media_db(media_id, tag):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT id FROM tags WHERE title = \'{tag}\'')
        tag_id = curs.fetchall()
        if check_for_tag_in_media(media_id, tag_id):
            curs.execute(f'DELETE FROM mediatags WHERE media_id = {media_id} AND tag_id = {tag_id}')
            conn.commit()
        return True
    except:
        return False


def delete_media_db(media_id):
    try:
        curs = conn.cursor()
        curs.execute(f'DELETE FROM mediatags WHERE media_id = {media_id}')
        conn.commit()
        curs.execute(f'DELETE FROM medias WHERE id = {media_id} RETURNING metadata_id')
        metadata_id = curs.fetchall()[0][0]
        conn.commit()
        curs.execute(f'DELETE FROM metadatas WHERE id = {metadata_id}')
        conn.commit()
        return True
    except:
        return False

def get_tags_db():
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT row_to_json(tags) FROM tags')
        resp = curs.fetchall()
        return [i[0] for i in resp]
    except:
        return False


def add_file_to_server(file):
    # file = request.files['file']
    uid = str(uuid.uuid1())
    new_file = Image.open(file)
    new_file.save('medias/' + uid + file.filename[-4:])
    new_file.close()
    return uid


def add_video_to_gallery(file, tags, title, username_id, gallery_id):
    try:
        media_id = add_media_to_db(file, tags, title, username_id)
        curs = conn.cursor()
        curs.execute(f'INSERT INTO gallerymedias (gallery_id, media_id) VALUES ({gallery_id}, {media_id})')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def add_video_to_album(file, tags, title, username_id, album_id):
    try:
        media_id = add_media_to_db(file, tags, title, username_id)
        curs = conn.cursor()
        curs.execute(f'INSERT INTO albummedias (album_id, media_id) VALUES ({album_id}, {media_id})')
        conn.commit()
        curs.close()
        return True
    except:
        return False


def get_albums_db(user1_id, user2_id=None):
    try:
        op = []
        if user2_id is None:
            curs = conn.cursor()
            curs.execute(f'SELECT id FROM albums')
            resp = curs.fetchall()
            for i in resp:
                if check_access_album(user1_id, i[0]):
                    curs.execute(f'SELECT row_to_json(albums) FROM albums WHERE id = {i[0]}')
                    resp2 = curs.fetchall()[0][0]
                    op.append(resp2)
        else:
            curs = conn.cursor()
            curs.execute(f'SELECT album_id FROM galleryalbums WHERE gallery_id = (SELECT gallery_id '
                         f'FROM users WHERE id = {user2_id})')
            resp = curs.fetchall()
            for i in resp:
                if check_access_album(user1_id, i[0]):
                    curs.execute(f'SELECT row_to_json(albums) FROM albums WHERE id = {i[0]}')
                    resp2 = curs.fetchall()[0][0]
                    op.append(resp2)
        curs.close()
        return op
    except:
        return False


def get_medias_db(user1_id, user2_id=None):
    try:
        op = []
        curs = conn.cursor()
        if user2_id is None:
            curs.execute(f'SELECT id FROM medias')
            resp = curs.fetchall()
            for i in resp:
                if check_access_media(i[0], user1_id):
                    curs.execute(f'SELECT row_to_json(medias) FROM medias WHERE id = {i[0]}')
                    resp2 = curs.fetchall()
                    op.append(resp2[0][0])
        else:
            curs.execute(f'SELECT id FROM medias WHERE id IN (SELECT media_id FROM gallerymedias '
                         f'WHERE gallery_id = (SELECT gallery_id FROM users WHERE id = {user2_id}))')
            resp = curs.fetchall()
            for i in resp:
                curs.execute(f'SELECT row_to_json(medias) FROM medias WHERE id = {i[0]}')
                resp2 = curs.fetchall()
                op.append(resp2[0][0])
        curs.close()
        return op
    except:
        return False


def get_albums_media_db(album_id):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT id FROM albummedias WHERE album_id = {album_id}')
        resp = curs.fetchall()
        op = []
        for i in resp:
            curs.execute(f'SELECT row_to_json(medias) FROM medias WHERE id = {i[0]}')
            resp2 = curs.fetchall()
            op.append(resp2[0][0])
        curs.close()
        return op
    except:
        return False


def get_album_members_db(album_id):
    try:
        curs = conn.cursor()
        curs.execute(f'SELECT gallery_id FROM galleryalbums WHERE album_id = {album_id}')
        resp = curs.fetchall()
        op = []
        for i in resp:
            curs.execute(f'SELECT row_to_json(users) FROM users WHERE gallery_id = {i[0]}')
            resp2 = curs.fetchall()
            op.append(resp2[0][0])
        curs.close()
        return op
    except:
        return False


def get_user_by_id(id):
    curs = conn.cursor()
    curs.execute(f'SELECT row_to_json(Users) FROM Users WHERE id = \'{id}\'')
    resp = curs.fetchall()
    curs.close()
    if resp != []:
        return resp[0][0]
    else:
        return False