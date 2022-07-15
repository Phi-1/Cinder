from flask import Flask, Response
from flask_cors import CORS
import re
import os

server = Flask(__name__)
CORS(server)

def read_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath) as f:
        return f.read()

@server.route("/")
def index():
    return read_file("./index.html")

@server.route("/src/js/<filename>")
def get_js(filename):
    ext = "" if re.match(r"\.js", filename) else ".js"
    return Response(read_file(f"./src/js/{filename}{ext}"), mimetype="text/javascript")

@server.route("/src/js/<subfolder>/<filename>")
def get_component(filename, subfolder):
    ext = "" if re.match(r"\.js", filename) else ".js"
    return Response(read_file(f"./src/js/{subfolder}/{filename}{ext}"), mimetype="text/javascript")

if __name__ == "__main__":
    server.run(host="localhost", port=6600)