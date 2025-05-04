from flask import Blueprint, render_template

wallets = Blueprint('wallets', __name__)

@wallets.route('/wallets')
def wallets_page():
    wallets = ["My Eco Wallet", "節能帳戶", "碳權帳戶"]
    return render_template('wallets.html', wallets=wallets)
