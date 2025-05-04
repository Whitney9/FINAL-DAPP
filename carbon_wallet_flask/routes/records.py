from flask import Blueprint, render_template

records = Blueprint('records', __name__)

@records.route('/records', methods=['GET'])
def records_endpoint():
   return render_template('records.html')