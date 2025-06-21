import random
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from api.models import Proveedor, Gasto, Usuario, Restaurante, Venta
from app import app, db
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from datetime import date, timedelta

load_dotenv()

with app.app_context():
    print("🧹 Borrando TODOS los datos...")

    Venta.query.delete()
    Gasto.query.delete()
    Proveedor.query.delete()
    Usuario.query.delete()
    Restaurante.query.delete()
    db.session.commit()

    print("🔄 Inicializando seed...")

    nombres_restaurantes = ["La Marea", "Tango Grill", "Internacional Bar", "Mar & Terra"]
    encargados_nombres = ["Laura", "Carlos", "Ana", "Pedro"]
    chefs_nombres = ["Miguel", "Sofía", "Javier", "Lucía"]

    restaurantes = []
    for nombre in nombres_restaurantes:
        restaurante = Restaurante(nombre=nombre)
        db.session.add(restaurante)
        restaurantes.append(restaurante)
    db.session.commit()

    print("🏗️ Restaurantes creados.")

    for i, restaurante in enumerate(restaurantes):
        encargado = Usuario(
            nombre=encargados_nombres[i],
            email=f"encargado.{restaurante.nombre.replace(' ', '').lower()}@ohmychef.com",
            rol="encargado",
            status="active",
            restaurante_id=restaurante.id,
            password=generate_password_hash("123456")
        )
        chef = Usuario(
            nombre=chefs_nombres[i],
            email=f"chef.{restaurante.nombre.replace(' ', '').lower()}@ohmychef.com",
            rol="chef",
            status="active",
            restaurante_id=restaurante.id,
            password=generate_password_hash("123456")
        )
        db.session.add(encargado)
        db.session.add(chef)
        print(f"👤 Encargado y Chef creados para {restaurante.nombre}")

    admin = Usuario(
        nombre="Admin Principal",
        email="admin@ohmychef.com",
        rol="admin",
        status="active",
        restaurante_id=None,
        password=generate_password_hash("123456")
    )
    db.session.add(admin)
    db.session.commit()

    print("👤 Admin y usuarios creados.")

    categorias = ["alimentos", "bebidas", "limpieza", "otros"]
    nombres_proveedores = [
        "Frutas Martínez", "Carnes del Norte", "Bebidas Vega", "LimpioMax",
        "Quesos del Sur", "Panadería Sol", "Pescados Ríos", "Verduras Fresh",
        "Congelados Express", "Especias del Mundo"
    ]

    print("➕ Creando proveedores...")
    proveedores = []
    for nombre in nombres_proveedores:
        prov = Proveedor(
            nombre=nombre,
            categoria=random.choice(categorias),
            direccion=f"Calle {random.randint(1, 100)}",
            telefono=f"+34 6{random.randint(10000000, 99999999)}",
            restaurante_id=random.choice(restaurantes).id
        )
        db.session.add(prov)
        proveedores.append(prov)
    db.session.commit()

    print("💰 Generando gastos y ventas para 31 días...")
    base_fecha = date.today().replace(day=1)
    for restaurante in restaurantes:
        chef = Usuario.query.filter_by(rol='chef', restaurante_id=restaurante.id).first()
        for i in range(31):
            fecha = base_fecha + timedelta(days=i)
            # Gastos
            for _ in range(2):
                proveedor = random.choice(proveedores)
                gasto = Gasto(
                    fecha=fecha,
                    monto=round(random.uniform(10, 100), 2),
                    categoria=proveedor.categoria,
                    proveedor_id=proveedor.id,
                    usuario_id=chef.id,
                    restaurante_id=restaurante.id,
                    nota=f"Gasto auto {i+1} de {proveedor.nombre}"
                )
                db.session.add(gasto)
            # Ventas
            venta = Venta(
                fecha=fecha,
                turno="mañana",
                monto=round(random.uniform(150, 400), 2),
                restaurante_id=restaurante.id
            )
            db.session.add(venta)
    db.session.commit()

    print("✅ Base de datos reiniciada con éxito.")
