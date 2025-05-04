from carbon_wallet_flask import create_app
from carbon_wallet_flask.models import db
app = create_app()
if __name__ == '__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True)
