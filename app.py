from website import start
from dotenv import load_dotenv
import os

load_dotenv()

SERVER_NAME = os.getenv("SERVER_NAME")
SERVER_PORT = os.getenv("SERVER_PORT")

app = start()

if(__name__ == "__main__"):
    app.config["SERVER_NAME"] = f"{SERVER_NAME}:{SERVER_PORT}"
    app.config["SESSION_COOKIE_DOMAIN"] = f".{SERVER_NAME}"
    app.run(host="0.0.0.0", debug=True)