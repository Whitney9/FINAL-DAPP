from rent_house_dapp import create_app
from rent_house_dapp.models import db
app = create_app()
if __name__ == '__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True)
