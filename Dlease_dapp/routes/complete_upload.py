from flask import Blueprint, render_template

complete_upload = Blueprint('complete_upload', __name__)

@complete_upload.route('/complete_upload', methods=['GET'])
def complete_upload_endpoint():
   return render_template('complete_upload.html')