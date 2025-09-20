# routes/product.py
from flask import Blueprint, request, jsonify
from extensions import db
from models import Product

product_bp = Blueprint("product", __name__, url_prefix="/api/products")

@product_bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json()
    if not data.get("name") or data.get("stock_quantity") is None:
        return jsonify({"message": "Missing fields"}), 400
    product = Product(name=data["name"], stock_quantity=data["stock_quantity"])
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product created", "product_id": product.id}), 201

@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "stock_quantity": p.stock_quantity} for p in products])

@product_bp.route("/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.name = data.get("name", product.name)
    product.stock_quantity = data.get("stock_quantity", product.stock_quantity)
    db.session.commit()
    return jsonify({"message": "Product updated"})

@product_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})
