from flask import Blueprint, render_template

my_rentals = Blueprint('my_rentals', __name__)

@my_rentals.route('/my_rentals', methods=['GET'])
def my_rentals_endpoint():
   return render_template('my_rentals.html')