from flask import Blueprint, render_template, request, jsonify
from werkzeug.security import generate_password_hash
from rent_house_dapp.models.user import User
from rent_house_dapp.models import db
from datetime import datetime

register = Blueprint('register', __name__)

@register.route('/register', methods=['GET'])
def register_endpoint():
   return render_template('register.html')

@register.route('/register-user', methods=['POST'])
def register_user():
   data = request.get_json()
   name = data.get('name')
   birthdate = data.get('birthdate')
   gender = data.get('gender')
   email = data.get('email')
   password = data.get('password')

   if not all([name, birthdate, gender, email, password]):
      return jsonify(success=False, error="請輸入所有必填欄位！")

   birthdate = datetime.strptime(birthdate, "%Y-%m-%d").date()

   existing_user = User.query.filter_by(email=email).first()
   if existing_user:
      return jsonify(success=False, error="此電子郵件已被註冊！")

   hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

   new_user = User(
      name=name,
      birthdate=birthdate,
      gender=gender,
      email=email,
      password=hashed_password
   )

   try:
      db.session.add(new_user)
      db.session.commit()
      return jsonify(success=True)
   except Exception as e:
      db.session.rollback()
      return jsonify(success=False, error="伺服器錯誤，請稍後再試！")