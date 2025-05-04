from flask import Blueprint, render_template

home = Blueprint('home', __name__)

@home.route('/home', methods=['GET'])
def home_endpoint():
   return render_template('home.html')