from flask import Blueprint, request, jsonify
from extensions import db
from models import BOM, Product

bom_bp = Blueprint("bom", __name__, url_prefix="/api/bom")

# Create BOM
@bom_bp.route("/", methods=["POST"])
def create_bom():
    data = request.get_json()
    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"message": "Product not found"}), 404
    bom = BOM(
        product_id=product.id,
        component_name=data["component_name"],
        quantity=data["quantity"]
    )
    db.session.add(bom)
    db.session.commit()
    return jsonify({"message": "BOM created", "id": bom.id}), 201

# Get all BOMs
@bom_bp.route("/", methods=["GET"])
def get_boms():
    boms = BOM.query.all()
    return jsonify([{
        "id": b.id,
        "product_id": b.product_id,
        "component_name": b.component_name,
        "quantity": b.quantity
    } for b in boms])

# Update BOM
@bom_bp.route("/<int:id>", methods=["PUT"])
def update_bom(id):
    bom = BOM.query.get_or_404(id)
    data = request.get_json()
    bom.component_name = data.get("component_name", bom.component_name)
    bom.quantity = data.get("quantity", bom.quantity)
    db.session.commit()
    return jsonify({"message": "BOM updated"})

# Delete BOM
@bom_bp.route("/<int:id>", methods=["DELETE"])
def delete_bom(id):
    bom = BOM.query.get_or_404(id)
    db.session.delete(bom)
    db.session.commit()
    return jsonify({"message": "BOM deleted"})
