from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

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
    profile_pictures = db.Column(db.String)
    created_at = db.Column(db.Datetime)
    updated_at = db.Column(db.Datetime)

    ratings = db.relationship("Rating", back_populates="game")
    games = association_proxy("ratings", "game")

    serialize_rules = ("-ratings.user", "-game")

class Game(db.Model, SerializerMixin):
    __tablename__ = "games_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    release_date = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)

    ratings = db.relationship("Rating", back_populates="user")
    users = association_proxy("ratings", "user")

    serialize_rules = ("-ratings.game", "user")

class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings_table"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.Datetime)
    updated_at = db.Column(db.Datetime)

    game_id = db.Column(db.Integer, db.ForeignKey("games_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))

    game = db.relationship("Game", back_populates="ratings")
    user = db.relationship("User", back_populates="ratings")

    serialize_rules = ("-game.ratings", "-user.ratings")
