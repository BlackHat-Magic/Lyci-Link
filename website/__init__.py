from dotenv import load_dotenv
from flask import Flask
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def start():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = SECRET_KEY
    
    from .epmain import epmain

    app.register_blueprint(epmain, url_prefix="/")

    return(app)