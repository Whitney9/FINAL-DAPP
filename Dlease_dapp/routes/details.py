from flask import Blueprint, render_template
details = Blueprint('details', __name__)

@details.route('/details', methods=['GET'])
def details_endpoint():
   return render_template('details.html')