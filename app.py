from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, bcrypt, socketio

app = Flask(__name__)

# PostgreSQL config
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Rohit2407@localhost:5432/manufacturing_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialize extensions with app
db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
socketio.init_app(app, cors_allowed_origins="http://localhost:3000")

# Test route
@app.route("/")
def home():
    return "Backend running!"

# -----------------------------
# Import and register all routes
# -----------------------------
from routes.auth import auth_bp
from routes.product import product_bp
from routes.mo import mo_bp
from routes.wo import wo_bp
from routes.bom import bom_bp
from routes.workcenter import workcenter_bp
from routes.stock import stock_bp

app.register_blueprint(auth_bp)
app.register_blueprint(product_bp)
app.register_blueprint(mo_bp)
app.register_blueprint(wo_bp)
app.register_blueprint(bom_bp)
app.register_blueprint(workcenter_bp)
app.register_blueprint(stock_bp)

# -----------------------------
# Import models for CLI / shell
# -----------------------------
from models import User, Product, ManufacturingOrder, WorkOrder, BOM, WorkCenter, StockLedger

# Run backend
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
