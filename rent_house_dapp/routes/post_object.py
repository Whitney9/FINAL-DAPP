from flask import Blueprint, render_template

post_object = Blueprint('post_object', __name__)

@post_object.route('/post_object', methods=['GET'])
def post_object_endpoint():
   return render_template('post_object.html')