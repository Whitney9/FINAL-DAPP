from flask import Blueprint, render_template, request, jsonify
from werkzeug.security import check_password_hash
from rent_house_dapp.models.user import User

login = Blueprint('login', __name__)

@login.route('/')
@login.route('/login', methods=['GET'])
def login_endpoint():
   return render_template('login.html')

@login.route('/login-check', methods=['POST'])
def login_check():
   data = request.get_json()
   email = data.get('email')
   password = data.get('password')

   if not email or not password:
      return jsonify(success=False, error="請輸入電子郵件和密碼！")

   user = User.query.filter_by(email=email).first()
   if not user:
      return jsonify(success=False, error="帳號或密碼錯誤！")

   if not check_password_hash(user.password, password):
      return jsonify(success=False, error="帳號或密碼錯誤！")

   return jsonify(success=True)