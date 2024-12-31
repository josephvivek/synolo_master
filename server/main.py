from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app,origins='*')

users={'vivek1':'260703'}

@app.route("/",methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if (username in users.keys() and users[username] == password):
        return jsonify({'message': 'Login successful'}),200
    else:
        return jsonify({'message': 'Invalid credentials'}),401

if __name__ == '__main__':
    app.run(debug=True)