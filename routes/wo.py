from flask import Blueprint, request, jsonify
from extensions import db
from models import WorkOrder, ManufacturingOrder, WorkCenter

wo_bp = Blueprint("wo", __name__, url_prefix="/api/wo")

# Create Work Order
@wo_bp.route("/", methods=["POST"])
def create_wo():
    data = request.get_json()
    mo = ManufacturingOrder.query.get(data["mo_id"])
    wc = WorkCenter.query.get(data["workcenter_id"])
    if not mo or not wc:
        return jsonify({"message": "MO or WorkCenter not found"}), 404
    wo = WorkOrder(
        mo_id=mo.id,
        workcenter_id=wc.id,
        operation_name=data.get("operation_name"),
        duration_minutes=data.get("duration_minutes", 0),
        status="Pending"
    )
    db.session.add(wo)
    db.session.commit()
    return jsonify({"message": "Work Order created", "id": wo.id}), 201

# Get all Work Orders
@wo_bp.route("/", methods=["GET"])
def get_wos():
    wos = WorkOrder.query.all()
    return jsonify([{
        "id": w.id,
        "mo_id": w.mo_id,
        "workcenter_id": w.workcenter_id,
        "operation_name": w.operation_name,
        "duration_minutes": w.duration_minutes,
        "status": w.status
    } for w in wos])

# Update Work Order
@wo_bp.route("/<int:id>", methods=["PUT"])
def update_wo(id):
    wo = WorkOrder.query.get_or_404(id)
    data = request.get_json()
    wo.operation_name = data.get("operation_name", wo.operation_name)
    wo.duration_minutes = data.get("duration_minutes", wo.duration_minutes)
    wo.status = data.get("status", wo.status)
    db.session.commit()
    return jsonify({"message": "Work Order updated"})

# Delete Work Order
@wo_bp.route("/<int:id>", methods=["DELETE"])
def delete_wo(id):
    wo = WorkOrder.query.get_or_404(id)
    db.session.delete(wo)
    db.session.commit()
    return jsonify({"message": "Work Order deleted"})
