#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc 

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Game, User, Rating, Genre, GameGenre, Platform, GamePlatform

fake = Faker()
video_game_platforms = ['Xbox One', 'Xbox Series X', 'PS4', 'PS5', 'PC', 'Nintendo Switch', 'Gameboy Color', 'Gameboy Advanced SP']
online_status = ['online', 'offline', 'idle']
people = ['Chett', 'Mohammad', 'Kash', 'Jaeem', 'Joe', 'Aaron', 'Anton', 'Daniel' ]
video_games = ['Red Dead Redemption 2', 'God of War', 'Final Fantasy VII', 'The Last of Us', 'Minecraft', 'BioShock']
video_game_genres = ['Action', 'Fighting', 'Platformer', 'Adventure', 'RPG', 'First Person Shooter', 'Survival', 'Racing', 'Battle Royale', 'Multiplayer', 'Singleplayer', 'Puzzle', 'Horror', 'Sports', 'Sandbox', 'Simulation', 'MMORPG', 'Party', 'Strategy']
allowed_ratings = [1, 2, 3, 4, 5]



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db")
        Game.query.delete()
        User.query.delete()
        Rating.query.delete()
        Genre.query.delete()
        GameGenre.query.delete()
        Platform.query.delete()
        GamePlatform.query.delete()

        print("Starting seed...")
        
        ###USER INSTANCES
        def create_users():
            users = [User(username=person, password=fake.password(), date_of_birth=fake.date_of_birth(), favorite_platform =rc(video_game_platforms), online_status=rc(online_status), profile_picture=fake.paragraph(nb_sentences=1) ) for person in people]
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

        ###GENRE INSTANCES
        def create_genres():
            genres = [Genre(name=genre) for genre in set(video_game_genres)]
            db.session.add_all(genres)
            db.session.commit()
            return genres 
        
        genres = create_genres()
        print("Creating Genres")

        ###PLATFORM INSTANCES
        def create_platfroms():
            platforms = [Platform(system_name=platform) for platform in video_game_platforms]
            db.session.add_all(platforms)
            db.session.commit()
            return platforms
        
        platforms = create_platfroms()
        print("Creating Platforms")

        ####GAME GENRE INSTANCES
        def create_game_genres():
            game_genre_instances = []
            for _  in range (20):
                g = GameGenre(game_id=rc([game.id for game in games]),
                              genre_id=rc([genre.id for genre in genres]) )
                game_genre_instances.append(g)
            db.session.add_all(game_genre_instances)
            db.session.commit()
            return game_genre_instances
        
        game_genres = create_game_genres()
        print("Creating Game Genres")

        ###GAME PLATFORM INSTANCES
        def create_game_platforms():
            game_platform_instances = []
            for _  in range (20):
                g = GamePlatform(game_id=rc([game.id for game in games]),
                                platform_id=rc([platform.id for platform in platforms]) )
                game_platform_instances.append(g)
            db.session.add_all(game_platform_instances)
            db.session.commit()
            return game_platform_instances
        
        game_platforms = create_game_platforms()
        print("Creating Game Platforms")


        

        
             


                


        
            

        



        



