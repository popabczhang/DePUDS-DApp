from flask import Flask

def create_app():
    app = Flask(__name__)

    with app.app_context():
        from .routes import api
        app.register_blueprint(api)

    return app

app = create_app()