from flask import Blueprint, request, jsonify
from extensions import db
from models import WorkCenter

workcenter_bp = Blueprint("workcenter", __name__, url_prefix="/api/workcenters")

# Create WorkCenter
@workcenter_bp.route("/", methods=["POST"])
def create_workcenter():
    data = request.get_json()
    wc = WorkCenter(
        name=data.get("name"),
        location=data.get("location", ""),
        cost_per_hour=data.get("cost_per_hour", 0.0)
    )
    db.session.add(wc)
    db.session.commit()
    return jsonify({"message": "WorkCenter created", "id": wc.id}), 201

# Get all WorkCenters
@workcenter_bp.route("/", methods=["GET"])
def get_workcenters():
    wcs = WorkCenter.query.all()
    return jsonify([{
        "id": w.id,
        "name": w.name,
        "location": w.location,
        "cost_per_hour": w.cost_per_hour
    } for w in wcs])

# Update WorkCenter
@workcenter_bp.route("/<int:id>", methods=["PUT"])
def update_workcenter(id):
    wc = WorkCenter.query.get_or_404(id)
    data = request.get_json()
    wc.name = data.get("name", wc.name)
    wc.location = data.get("location", wc.location)
    wc.cost_per_hour = data.get("cost_per_hour", wc.cost_per_hour)
    db.session.commit()
    return jsonify({"message": "WorkCenter updated"})

# Delete WorkCenter
@workcenter_bp.route("/<int:id>", methods=["DELETE"])
def delete_workcenter(id):
    wc = WorkCenter.query.get_or_404(id)
    db.session.delete(wc)
    db.session.commit()
    return jsonify({"message": "WorkCenter deleted"})
