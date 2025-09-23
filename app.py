from flask import Flask, render_template, redirect
app = Flask(__name__)

@app.route("/")
def home():
    return(
        render_template(
            "index.html"
        )
    )

@app.route("/yt")
@app.route("/youtube")
def youtube():
    return(
        redirect(
            "https://www.youtube.com/@lyciberi"
        )
    )

@app.route("/t")
@app.route("/x")
@app.route("/twt")
@app.route("/twitter")
def twitter():
    return(
        redirect(
            "https://twitter.com/lyciberi"
        )
    )

@app.route("/ttv")
@app.route("/twitch")
def twitch():
    return(
        redirect(
            "https://www.twitch.tv/lyciberi"
        )
    )

@app.route("/discord")
def discord():
    return(
        redirect(
            "https://discord.com/invite/Ywh4xN6YFX"
        )
    )

@app.route("/bsky")
@app.route("/bluesky")
def bluesky():
    return(
        redirect(
            "https://bsky.app/profile/lyciberi.bsky.social"
        )
    )

@app.route("/tiktok")
def tiktok():
    return(
        redirect(
            "https://www.tiktok.com/@lyciberi"
        )
    )

if(__name__ == "__main__"):
    app.run(host="0.0.0.0", debug=True)