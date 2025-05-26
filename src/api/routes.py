"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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

@api.route('/usuarios', methods=['POST'])

def crear_usuario():
    data = request.get_json()  

    if not data:
        return jsonify({"msg": "Datos no recibidos"}), 400

    nombre = data.get("nombre")
    email = data.get("email")
    contraseña = data.get("contraseña")
    rol = data.get("rol")
    restaurante_id = data.get("restaurante_id")

    if not nombre or not email or not contraseña or not rol or not restaurante_id:
        return jsonify({"msg": "Faltan campos obligatorios"}), 400

    nuevo_usuario = Usuario(
        nombre=nombre,
        email=email,
        contraseña=contraseña,
        rol=rol,
        restaurante_id=restaurante_id
    )

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"msg": "Usuario creado correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear el usuario", "error": str(e)}), 500

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
    usuario.contraseña = data.get("contraseña", usuario.contraseña)
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
