import psycopg2
import dotenv
import os
from bcrypt import checkpw, hashpw
from extension import salt
from jwt import encode, decode
from datetime import datetime, timedelta
from extension import app


dotenv.load_dotenv()


if os.getenv('huynya'):
    pg_host = 'localhost'
else:
    pg_host = 'postgres'
conn = psycopg2.connect(database=os.getenv('PG_DATABASE'), user=os.getenv('PG_USERNAME'),
                        password=os.getenv('PG_PASSWORD'), host=pg_host,
                        port=os.getenv('PG_PORT'))

def create_tables():
    curs = conn.cursor()
    curs.execute('''CREATE TABLE IF NOT EXISTS Users(
                      id serial primary key,
                      username TEXT UNIQUE,
                      pass_hash TEXT,
                      region TEXT
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
                      media_type TEXT,
                      media_bytea BYTEA,
                      tags TEXT[],
                      coordinates TEXT
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
                    );''')
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
    curs = conn.cursor()
    curs.execute('SELECT row_to_json(Users) FROM Users')
    resp = curs.fetchall()
    pass

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
            return True
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


def check_entrance(username, password):
    if username in get_usernames_db():
        user = get_user(username)
        if checkpw(bytes(password, encoding='UTF-8'), bytes(user['pass_hash'], encoding='UTF-8')):
            return generate_token(user['id'], username, user['pass_hash'])
        else:
            return False
    else:
        return False


def add_user(username, password, region):
    if username not in get_usernames_db():
        curs = conn.cursor()
        curs.execute(f'INSERT INTO Users(username, pass_hash, region) VALUES(\'{username}\', \'{str(hashpw(bytes(password, encoding="UTF-8"), salt))[2:-1]}\', \'{region}\')')
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
