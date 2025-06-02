"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)


@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()

    resultados = []
    for u in usuarios:
        resultados.append({
            "id": u.id,
            "nombre": u.nombre,
            "email": u.email,
            "rol": u.rol
        })

    return jsonify(resultados), 200


@api.route("/register", methods=["POST"])
def register():
    try:

        data = request.json

        if not data["email"] or not data["password"]:
            raise Exception({"error":  "missing data"})
        stm = select(Usuario).where(
            Usuario.email == data["email"])
        existing_user = db.session.execute(stm).scalar()
        if existing_user:
            raise Exception({"error":  "email, taken, try logging in"})

        hashed_password = generate_password_hash(data["password"])

        new_user = Usuario(
            nombre=data["nombre"],
            email=data["email"],
            password=hashed_password,
            rol=data["rol"],
            restaurante_id=data.get("restaurante_id"),

        )
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=str(new_user.id))
        return jsonify({"msj": "register OK", "token": token}), 201

    except Exception as e:

        db.session.rollback()
        return jsonify({"error": "something went wrong", "detalle": str(e)}), 400


@api.route('/usuarios/<int:id>', methods=['GET'])
def obtener_usuario(id):
    usuario = Usuario.query.get(id)

    if usuario is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    resultado = {
        "id": usuario.id,
        "nombre": usuario.nombre,
        "email": usuario.email,
        "rol": usuario.rol,
        "restaurante_id": usuario.restaurante_id
    }

    return jsonify(resultado), 200


@api.route('/usuarios/<int:id>', methods=['PUT'])
def editar_usuario(id):
    usuario = Usuario.query.get(id)

    if usuario is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"msg": "Datos no recibidos"}), 400

    usuario.nombre = data.get("nombre", usuario.nombre)
    usuario.email = data.get("email", usuario.email)
    usuario.password = data.get("password", usuario.password)
    usuario.rol = data.get("rol", usuario.rol)
    usuario.restaurante_id = data.get("restaurante_id", usuario.restaurante_id)

    try:
        db.session.commit()
        return jsonify({"msg": "Usuario actualizado"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar el usuario", "error": str(e)}), 500


@api.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get(id)

    if usuario is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    try:
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({"msg": "Usuario eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el usuario", "error": str(e)}), 500


@api.route('/ventas', methods=['GET'])
def get_ventas():
    ventas = Venta.query.all()

    resultados = []
    for v in ventas:
        resultados.append({
            "id": v.id,
            "fecha": v.fecha.isoformat(),
            "monto": v.monto,
            "turno": v.turno,
            "restaurante_id": v.restaurante_id
        })

    return jsonify(resultados), 200

    # AUTENTCACION JWT - AUTENTCACION JWT - AUTENTCACION JWT- AUTENTCACION JWT - AUTENTCACION JWT - AUTENTCACION JWT
    # - AUTENTCACION JWT - AUTENTCACION JWT - AUTENTCACION JWT - AUTENTCACION JWT


@api.route("/login", methods=["POST"])
def login():
    try:

        data = request.json

        if not data["email"] or not data["password"]:
            raise Exception({"error":  "missing data"})
        stm = select(Usuario).where(
            Usuario.email == data["email"])
        user = db.session.execute(stm).scalar()
        if not user:
            raise Exception({"error":  "email not found"})

        if not check_password_hash(user.password, data["password"]):
            return jsonify({"success": False, "msg": "email/password incorrectos"}), 418

        token = create_access_token(identity={"id": user.id, "rol": user.rol})
        return jsonify({"msj": "login ok", "token": token, "rol": user.rol}), 200

    except Exception as e:

        db.session.rollback()
        return jsonify({"error": "something went wrong"}), 400
