from flask import Blueprint, request, jsonify
from extensions import db
from models import StockLedger, Product

stock_bp = Blueprint("stock", __name__, url_prefix="/api/stock")

# Add stock movement
@stock_bp.route("/", methods=["POST"])
def add_stock():
    data = request.get_json()
    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"message": "Product not found"}), 404
    change = data.get("change")
    reason = data.get("reason", "")
    stock = StockLedger(product_id=product.id, change=change, reason=reason)
    product.stock_quantity += change
    db.session.add(stock)
    db.session.commit()
    return jsonify({"message": "Stock updated", "ledger_id": stock.id}), 201

# Get all stock ledger entries
@stock_bp.route("/", methods=["GET"])
def get_stock():
    entries = StockLedger.query.all()
    return jsonify([{
        "id": s.id,
        "product_id": s.product_id,
        "change": s.change,
        "reason": s.reason,
        "timestamp": s.timestamp
    } for s in entries])
