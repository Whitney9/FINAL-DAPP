from flask import Flask
from config import Config
from Dlease_dapp.models import db
def create_app():
   app = Flask(__name__, instance_relative_config=True)
   app.config.from_object(Config)

   db.init_app(app)
   # Import and register routes
   
   from Dlease_dapp.routes.login import login
   from Dlease_dapp.routes.register import register
   from Dlease_dapp.routes.homepage import homepage
   from Dlease_dapp.routes.post_object import post_object
   from Dlease_dapp.routes.my_rentals import my_rentals
   from Dlease_dapp.routes.About_Us import About_Us
   from Dlease_dapp.routes.complete_upload import complete_upload
   from Dlease_dapp.routes.details import details
   
   app.register_blueprint(homepage)
   app.register_blueprint(login)
   app.register_blueprint(register)
   app.register_blueprint(post_object)
   app.register_blueprint(my_rentals)
   app.register_blueprint(About_Us)
   app.register_blueprint(complete_upload)
   app.register_blueprint(details)
   return app
