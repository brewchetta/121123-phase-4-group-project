# imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import Rating, Game, User, db

# app factory function for instantiating app
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '282597DB535D1589B2C5AB6C2B326'
    app.json.compact = False

    migrate = Migrate(app, db)
    db.init_app(app)

    # Instantiate CORS
    CORS(app)

    return app