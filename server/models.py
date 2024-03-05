from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users_table"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    date_of_birth = db.Column(db.String)
    favorite_platform = db.Column(db.String)
    online_status = db.Column(db.String)
    profile_picture = db.Column(db.String)
    created_at = db.Column(db.DateTime, )
    updated_at = db.Column(db.DateTime)

    ratings = db.relationship("Rating", back_populates="user")
    games = association_proxy("ratings", "game")

    serialize_rules = ("-ratings.user", "-game")



class Game(db.Model, SerializerMixin):
    __tablename__ = "games_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    release_date = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.String)
    bestseller = db.Column(db.Boolean, default=False)


    ratings = db.relationship("Rating", back_populates="game")
    users = association_proxy("ratings", "user")


    game_genres = db.relationship("GameGenre", back_populates="game")
    genres = association_proxy("game_genres", "genre")

    game_platforms = db.relationship("GamePlatform", back_populates="game")
    platforms = association_proxy("game_platforms", "platform")


    serialize_rules = ("-ratings.game", "-users", "-game_genres.game", "-genres", "-game_platforms.game", "-platforms")
    



class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings_table"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    game_id = db.Column(db.Integer, db.ForeignKey("games_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))

    game = db.relationship("Game", back_populates="ratings")
    user = db.relationship("User", back_populates="ratings")
    
    serialize_rules = ("-game.ratings", "-user.ratings")



class Genre(db.Model, SerializerMixin):
    __tablename__ = "genres_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    game_genres = db.relationship("GameGenre", back_populates="genre")
    games = association_proxy("game_genres", "game")

    serialize_rules = ("-game_genres.genre", "-games")



class GameGenre(db.Model, SerializerMixin):
    __tablename__ = "game_genres_table"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games_table.id"))
    genre_id = db.Column(db.Integer, db.ForeignKey("genres_table.id"))

    game = db.relationship("Game", back_populates="game_genres")
    genre = db.relationship("Genre", back_populates="game_genres")

    serialize_rules = ("-game.game_genres", "-genre.game_genres")



class Platform(db.Model, SerializerMixin):
    __tablename__ = "platforms_table"

    id = db.Column(db.Integer, primary_key=True)
    system_name = db.Column(db.String, unique=True, nullable=False)

    game_platforms = db.relationship("GamePlatform", back_populates="platform")
    games = association_proxy("game_platforms", "game") 

    serialize_rules = ("-game_platforms.platform", "-games")



class GamePlatform(db.Model, SerializerMixin):
    __tablename__ = "game_platforms_table"

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games_table.id"))
    platform_id = db.Column(db.Integer, db.ForeignKey("platforms_table.id"))

    game = db.relationship("Game", back_populates="game_platforms")
    platform = db.relationship("Platform", back_populates="game_platforms")

    serialize_rules = ("-game.game_platforms", "-platform.game_platforms")
    pass

    

