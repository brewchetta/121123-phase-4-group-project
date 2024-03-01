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


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Starting seed...")
        
        u1 = User(username=people[0], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u2 = User(username=people[1], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u3 = User(username=people[2], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u4 = User(username=people[3], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u5 = User(username=people[4], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u6 = User(username=people[5], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u7 = User(username=people[6], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        u8 = User(username=people[7], password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) )
        users = [u1, u2, u3, u4, u5, u6, u7, u8]
        db.session.add_all(users)
        print("Creating Users")

        def create_games():
            for game in video_games:
                new_game = Game(name=game, release_date=fake.date_of_birth(), image_url=fake.paragraph(nb_sentences=1), description=fake.paragraph(nb_sentences=5))
                db.session.add(new_game)
            
        create_games()
        db.session.commit()

        print("Creating Games")

        



