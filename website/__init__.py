from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_moment import Moment

from config import config
import os

bootstrap = Bootstrap()
moment = Moment()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # Initialize extensions
    bootstrap.init_app(app)
    moment.init_app(app)


    # Register main blueprint (assuming you have a main blueprint)
    from website.main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/')

    # Attach routes and custom error pages here

    return app
