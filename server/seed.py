#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc 

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Game, User, Rating

fake = Faker()
platforms = ['Xbox One', 'Xbox Series X', 'PS4', 'PS5', 'PC', 'Nintendo Switch', 'Gameboy Color', 'Gameboy Advanced SP']
online_status = ['online', 'offline', 'idle']
people = ['Chett', 'Mohammad', 'Kash', 'Jaeem', 'Joe', 'Aaron', 'Anton', 'Daniel' ]
video_games = ['Red Dead Redemption 2', 'God of War', 'Final Fantasy VII', 'The Last of Us', 'Minecraft', 'BioShock']
allowed_ratings = [1, 2, 3, 4, 5]


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db")
        Game.query.delete()
        User.query.delete()
        Rating.query.delete()

        print("Starting seed...")
        
        ###USER INSTANCES
        def create_users():
            users = [User(username=person, password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) ) for person in people]
            db.session.add_all(users)
            db.session.commit()
            return users

        users = create_users()
        print("Creating Users")


        ###GAME INSTANCES
        def create_games():
            games = [Game(name=game, release_date=fake.date_of_birth(), image_url=fake.paragraph(nb_sentences=1), description=fake.paragraph(nb_sentences=5)) for game in video_games]
            db.session.add_all(games)
            db.session.commit()
            return games
    
        games = create_games()
        print("Creating Games")
       
        
        ###RATINGS INSTANCES
        def create_ratings():
            rating_instances = []
            for _ in range(10):
                r = Rating(rating=rc(allowed_ratings), 
                           comment=fake.paragraph(nb_sentences=2), 
                           game_id=rc([game.id for game in games]), 
                           user_id=rc([user.id for user in users]) )
                rating_instances.append(r)
            db.session.add_all(rating_instances)
            db.session.commit()
            return rating_instances
        
        ratings = create_ratings()
        print("Creating Ratings")

                


        
            

        



        



