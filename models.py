from extensions import db

# ----------------------
# User
# ----------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default="user")  # user/admin

    def __repr__(self):
        return f"<User {self.username}>"

# ----------------------
# Product
# ----------------------
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    stock_quantity = db.Column(db.Integer, default=0)
    boms = db.relationship("BOM", backref="product", lazy=True)

    def __repr__(self):
        return f"<Product {self.name}>"

# ----------------------
# BOM (Bill of Materials)
# ----------------------
class BOM(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    component_name = db.Column(db.String(150), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# ----------------------
# Work Center
# ----------------------
class WorkCenter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(150))
    cost_per_hour = db.Column(db.Float, default=0.0)
    work_orders = db.relationship("WorkOrder", backref="workcenter", lazy=True)

# ----------------------
# Manufacturing Order (MO)
# ----------------------
class ManufacturingOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    status = db.Column(db.String(50), default="Planned")  # Planned/In Progress/Done/Cancelled
    work_orders = db.relationship("WorkOrder", backref="mo", lazy=True)

# ----------------------
# Work Order (WO)
# ----------------------
class WorkOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mo_id = db.Column(db.Integer, db.ForeignKey("manufacturing_order.id"), nullable=False)
    workcenter_id = db.Column(db.Integer, db.ForeignKey("work_center.id"), nullable=False)
    operation_name = db.Column(db.String(150), nullable=False)
    duration_minutes = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default="Pending")  # Pending/In Progress/Completed

# ----------------------
# Stock Ledger
# ----------------------
class StockLedger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    change = db.Column(db.Integer, nullable=False)  # +ve for addition, -ve for consumption
    reason = db.Column(db.String(150))
    timestamp = db.Column(db.DateTime, default=db.func.now())
