#!/usr/bin/env python3

# library imports
from flask import request, session
from models import db, User, Game, Rating, Platform, GameGenre, Genre, GamePlatform
from flask_bcrypt import Bcrypt

# local imports


from config import create_app, db

# Add your model imports

# instantiate app
app = create_app()
bcrypt = Bcrypt(app)
# routes go here

@app.route('/')
def index():
    return '<h1>121123 Phase 4 Project/Product</h1>'

# Users Routes

@app.get('/check_session')
def check_session():
    user_id = session.get('user_id')
    user = User.query.where(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 200
    
@app.post('/login')
def login():
    data = request.json
    username = data['username']
    password = data['password']
    user = User.query.where(User.username == username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'error': 'Invalid username or password'}, 401
    
@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {}, 204


@app.get('/users')
def get_users():
    all_users = User.query.all()
    return [ user.to_dict() for user in all_users], 200

@app.get('/users/<int:id>')
def get_users_by_id(id):
    found_users = User.query.where(User.id ==id).first()
    if found_users:
        return found_users.to_dict(), 200
    else:
        return{'error': 'User not found'}

@app.post('/users')
def add_users():
    data = request.json

    try:
        new_user = User(
            username=data.get('username'), date_of_birth=data.get('date_of_birth'), favorite_platform=data.get('favorite_platform'), profile_picture=data.get('profile_picture'))
        new_user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    
    except ValueError as error:
        return {'error': f'{error}'}, 406
    except:
        return {'error': 'Invalid data'}
# Games Routes
        
@app.get('/games')
def get_games():
    all_games = Game.query.all()
    return [ game.to_dict() for game in all_games], 200

@app.get('/games/<int:id>')
def get_game_by_id(id):
    found_games = Game.query.where(Game.id ==id).first()
    if found_games:
        return found_games.to_dict(), 200
    else:
        return {'error': 'Game not found'}
    
@app.post('/games')
def post_games():
    data = request.json

    try:
        new_games = Game(name=data.get('name'), release_date=data.get('release_date'), image_url=data.get('image_url'), description=data.get('description'), price=data.get('price'))
        db.session.add(new_games)
        db.session.commit()
        return new_games.to_dict(), 200
    
    except ValueError as error:
        return{'error': f'{error}'}, 400
    
@app.patch('/games/<int:id>')
def update_games(id):
    data = request.json
    found_games = Game.query.where(Game.id ==id).first()
    
    if found_games:
        try:
            for key in data:
                setattr(found_games, key, data[key])
            db.session.commit()

            return found_games.to_dict(), 202
        
        except ValueError as error:
            return {'error': f'{error}'}, 406
    else:
        return {'error': "Game not found"}
    
#Rating Routes   
@app.get('/ratings')
def get_ratings():
    all_ratings = Rating.query.all()
    return [ rating.to_dict() for rating in all_ratings], 200

@app.post('/ratings')
def add_ratings():
    data = request.json

    try:
        new_rating = Rating(rating=data.get('rating'), comment=data.get('comment'), game_id=data.get('game_id'), user_id=data.get('user_id'))
        db.session.add(new_rating)
        db.session.commit()
        return new_rating.to_dict(), 201
    
    except ValueError as error:
        return {'error': f'{error}'}, 406
    except:
        return {'error': "Invalid Data"}

@app.get('/platform')
def get_platform():
    all_platform = Platform.query.all()
    return [ platform.to_dict() for platform in all_platform], 200

@app.post('/NewGameForm')
def create_game_form():
    data = request.json
    new_game = Game(name=data.get('name'), image_url=data.get('image_url'), release_date=data.get('release_date'), description=data.get('description'), price=data.get('price'))

    db.session.add(new_game)

    for genre_name in data.get('genre').split(','):
        found_genre = Genre.query.where(Genre.name == genre_name.strip()).first()
        if found_genre: 
            new_join = GameGenre(game=new_game, genre=found_genre)
            db.session.add(new_join)
        else:
            new_genre = Genre(name=genre_name.strip())
            new_join = GameGenre(game=new_game, genre=new_genre)
            db.session.add_all([new_genre, new_join])
    
    for platform_system_name in data.get('platform').split(','):
        found_platform = Platform.query.where(Platform.system_name == platform_system_name.strip()).first()
        if found_platform:
            new_join = GamePlatform(game=new_game, platform=found_platform)
            db.session.add(new_join)
        else:
            new_platform = Platform(system_name=platform_system_name.strip())
            new_join = GamePlatform(game=new_game, platform=new_platform)
            db.session.add_all([new_platform, new_join])

    db.session.commit()
    return new_game.to_dict(), 201
        


if __name__ == '__main__':
    app.run(port=5555, debug=True)

# ADD RULES AS NEEDED FOR THE ROUTES
