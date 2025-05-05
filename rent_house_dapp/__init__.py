from flask import Flask
from config import Config
from rent_house_dapp.models import db
def create_app():
   app = Flask(__name__, instance_relative_config=True)
   app.config.from_object(Config)

   db.init_app(app)
   # Import and register routes

   from rent_house_dapp.routes.login import login
   from rent_house_dapp.routes.register import register
   from rent_house_dapp.routes.homepage import homepage
   from rent_house_dapp.routes.post_object import post_object
   from rent_house_dapp.routes.my_rentals import my_rentals
   from rent_house_dapp.routes.About_Us import About_Us
   
   app.register_blueprint(homepage)
   app.register_blueprint(login)
   app.register_blueprint(register)
   app.register_blueprint(post_object)
   app.register_blueprint(my_rentals)
   app.register_blueprint(About_Us)

   return app
