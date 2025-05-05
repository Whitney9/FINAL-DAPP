from flask import Blueprint, render_template

About_Us = Blueprint('About_Us', __name__)

@About_Us.route('/About_Us', methods=['GET'])
def About_Us_endpoint():
   return render_template('About_Us.html')