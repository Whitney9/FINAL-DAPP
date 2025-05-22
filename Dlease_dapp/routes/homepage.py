from flask import Blueprint, render_template

homepage = Blueprint('homepage', __name__)

@homepage.route('/homepage', methods=['GET'])
def homepage_endpoint():
   return render_template('homepage.html')