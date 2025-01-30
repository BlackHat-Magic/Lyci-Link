from flask import Blueprint, Flask, render_template, redirect, url_for, request, flash, jsonify
import json

epmain = Blueprint("epmain", __name__)

@epmain.route("/")
def home():
    return(
        render_template(
            "index.html"
        )
    )

@epmain.route("/yt")
@epmain.route("/youtube")
def youtube():
    return(
        redirect(
            "https://www.youtube.com/@lyciberi"
        )
    )

@epmain.route("/t")
@epmain.route("/x")
@epmain.route("/twt")
@epmain.route("/twitter")
def twitter():
    return(
        redirect(
            "https://twitter.com/lyciberi"
        )
    )

@epmain.route("/ttv")
@epmain.route("/twitch")
def twitch():
    return(
        redirect(
            "https://www.twitch.tv/lyciberi"
        )
    )

@epmain.route("/discord")
def discord():
    return(
        redirect(
            "https://discord.com/invite/Ywh4xN6YFX"
        )
    )

@epmain.route("/bsky")
@epmain.route("/bluesky")
def bluesky():
    return(
        redirect(
            "https://bsky.app/profile/lyciberi.bsky.social"
        )
    )

@epmain.route("/tiktok")
def tiktok():
    return(
        redirect(
            "https://www.tiktok.com/@lyciberi"
        )
    )