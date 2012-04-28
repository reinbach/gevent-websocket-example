import json
import math
import time

from flask import Flask, render_template

import gevent
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler

app = Flask(__name__)
app.debug = True

class WebSocketApp(object):
    """Stream sine values"""
    def __call__(self, environ, start_response):
        ws = environ['wsgi.websocket']
        while True:
            x = time.time()
            y = 2.5 * (1 + math.sin(x))
            ws.send(json.dumps(dict(x=x, y=y)))
            gevent.sleep(0.1)

@app.route("/")
def home():
    return render_template("index.html")

def main():
    # setup server to handle webserver requests
    http_server = WSGIServer(('', 8000), app)

    # setup server to handle websocket requests
    ws_server = WSGIServer(
        ('', 9999), WebSocketApp(),
        handler_class=WebSocketHandler
    )

    gevent.joinall([
        gevent.spawn(http_server.serve_forever),
        gevent.spawn(ws_server.serve_forever)
    ])

if __name__ == "__main__":
    main()