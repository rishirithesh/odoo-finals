from flask import Blueprint, request, jsonify
from extensions import db
from models import ManufacturingOrder, Product, WorkOrder

mo_bp = Blueprint("mo", __name__, url_prefix="/api/mo")

@mo_bp.route("/", methods=["POST"])
def create_mo():
    data = request.get_json()
    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"message": "Product not found"}), 404
    mo = ManufacturingOrder(
        product_id=product.id,
        quantity=data["quantity"],
        status="Planned"
    )
    db.session.add(mo)
    db.session.commit()
    return jsonify({"message": "MO created", "id": mo.id}), 201

@mo_bp.route("/", methods=["GET"])
def get_mos():
    mos = ManufacturingOrder.query.all()
    return jsonify([{
        "id": m.id,
        "product_id": m.product_id,
        "quantity": m.quantity,
        "status": m.status
    } for m in mos])
