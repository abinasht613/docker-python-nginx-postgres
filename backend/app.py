from flask import Flask, jsonify, render_template   
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)

# Allow CORS for all routes under /api and only for requests from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# PostgreSQL Connection
DB_NAME = os.getenv("POSTGRES_DB", "mydatabase")
DB_USER = os.getenv("POSTGRES_USER", "user")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
DB_HOST = os.getenv("POSTGRES_HOST", "db")

def connect_db():
    return psycopg2.connect(
        dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST
    )

@app.route("/")
def home():
    # return render_template("index.html", message="Flask App Running with PostgreSQL & Nginx")
    return jsonify({"message": "Flask App Running with PostgreSQL & Nginx"})

@app.route("/users")
def get_users():
    print("GET /users")
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()
    cur.close()
    conn.close()
    # return render_template("users.html", users=users) # return template
    return jsonify(users)                             # return json

@app.errorhandler(404)
def not_found(e):
    return jsonify({"message": "Route not found:404"})
    #return "Route not found", 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
