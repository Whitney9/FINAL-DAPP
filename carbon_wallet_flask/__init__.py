from flask import Flask
from config import Config
from carbon_wallet_flask.models import db
def create_app():
   app = Flask(__name__, instance_relative_config=True)
   app.config.from_object(Config)

   db.init_app(app)
   # Import and register routes

   from carbon_wallet_flask.routes.login import login
   from carbon_wallet_flask.routes.register import register
   from carbon_wallet_flask.routes.homepage import homepage

   app.register_blueprint(homepage)
   app.register_blueprint(login)
   app.register_blueprint(register)

   return app
