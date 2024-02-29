#!/usr/bin/env python3

# library imports
from flask import request

# local imports
from config import create_app, db, api

# Add your model imports

# instantiate app
app = create_app()

# routes go here

@app.route('/')
def index():
    return '<h1>121123 Phase 4 Project/Product</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

