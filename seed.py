import random
import os
import sys
import unicodedata
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from api.models import Proveedor, Gasto, Usuario, Restaurante, Venta
from app import app, db
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from datetime import date, timedelta

load_dotenv()

def limpiar_email(texto):
    texto = unicodedata.normalize('NFKD', texto).encode('ascii', 'ignore').decode('utf-8')
    return texto.lower().replace(' ', '').replace('&', '')

with app.app_context():
    print("🧹 Borrando TODOS los datos...")

    Venta.query.delete()
    Gasto.query.delete()
    Proveedor.query.delete()
    Usuario.query.delete()
    Restaurante.query.delete()
    db.session.commit()

    print("🔄 Inicializando seed...")

    nombres_restaurantes = [
        "La Marea", "Tango Grill", "Internacional Bar", "Mar & Terra",
        "Sabor Criollo", "Pasta & Vino", "Fusión Oriental", "El Rincón Vegano",
        "Tapas Urbanas", "Bistró Mediterráneo"
    ]

    estados_gasto = ["dentro"] * 3 + ["limite"] * 3 + ["fuera"] * 4
    random.shuffle(estados_gasto)

    restaurantes = []
    for i, nombre in enumerate(nombres_restaurantes):
        clean_name = limpiar_email(nombre)
        restaurante = Restaurante(
            nombre=nombre,
            direccion=f"Calle {random.randint(1, 200)}, Ciudad",
            telefono=f"6{random.randint(10000000, 99999999)}",
            email_contacto=f"contacto.{clean_name}@ohmychef.com"
        )
        db.session.add(restaurante)
        restaurante.estado_gasto = estados_gasto[i]
        restaurantes.append(restaurante)
    db.session.commit()

    print("🏗️ Restaurantes creados.")

    apellidos = ["Gómez", "Pérez", "Rodríguez", "Fernández", "López", "Martínez"]
    nombres_chef = ["Laura", "Carlos", "Sofía", "Pedro", "Ana", "Miguel", "Lucía", "David", "Elena", "Javier"]
    nombres_encargado = ["Andrés", "Patricia", "Raúl", "Beatriz", "Tomás", "Irene", "Diego", "Clara", "Rubén", "Nuria"]

    for i, restaurante in enumerate(restaurantes):
        clean_name = limpiar_email(restaurante.nombre)
        encargado = Usuario(
            nombre=f"{nombres_encargado[i]} {random.choice(apellidos)}",
            email=f"encargado.{clean_name}@ohmychef.com",
            rol="encargado",
            status="active",
            restaurante_id=restaurante.id,
            password=generate_password_hash("123456")
        )
        chef = Usuario(
            nombre=f"{nombres_chef[i]} {random.choice(apellidos)}",
            email=f"chef.{clean_name}@ohmychef.com",
            rol="chef",
            status="active",
            restaurante_id=restaurante.id,
            password=generate_password_hash("123456")
        )
        db.session.add(encargado)
        db.session.add(chef)

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

    print("➕ Creando proveedores...")
    for restaurante in restaurantes:
        clean_name = limpiar_email(restaurante.nombre)
        for i in range(10):
            prov = Proveedor(
                nombre=f"Proveedor {i+1} - {restaurante.nombre}",
                categoria=random.choice(categorias),
                direccion=f"Calle Proveedor {i+1}, Ciudad",
                telefono=f"6{random.randint(10000000, 99999999)}",
                email_contacto=f"prov{i+1}@{clean_name}.com",
                restaurante_id=restaurante.id
            )
            db.session.add(prov)
    db.session.commit()

    print("💰 Generando gastos y ventas desde enero...")
    fecha_inicio = date(2025, 1, 1)
    fecha_fin = date(2025, 6, 25)  # 📌 Generar solo hasta el 25 de junio
    dias = (fecha_fin - fecha_inicio).days

    for restaurante in restaurantes:
        chef = Usuario.query.filter_by(rol='chef', restaurante_id=restaurante.id).first()
        proveedores = Proveedor.query.filter_by(restaurante_id=restaurante.id).all()

        for i in range(dias):
            fecha = fecha_inicio + timedelta(days=i)

            gastos_del_dia = []
            for _ in range(8):
                proveedor = random.choice(proveedores)
                if restaurante.estado_gasto == "dentro":
                    monto = round(random.uniform(10, 50), 2)
                elif restaurante.estado_gasto == "limite":
                    monto = round(random.uniform(20, 60), 2)
                else:
                    monto = round(random.uniform(40, 80), 2)

                gasto = Gasto(
                    fecha=fecha,
                    monto=monto,
                    categoria=proveedor.categoria,
                    proveedor_id=proveedor.id,
                    usuario_id=chef.id,
                    restaurante_id=restaurante.id,
                    nota=f"Gasto generado automáticamente"
                )
                db.session.add(gasto)
                gastos_del_dia.append(monto)

            total_gastos_dia = sum(gastos_del_dia)

            if restaurante.estado_gasto == "dentro":
                porcentaje = random.uniform(0.25, 0.30)
            elif restaurante.estado_gasto == "limite":
                porcentaje = random.uniform(0.30, 0.33)
            else:
                porcentaje = random.uniform(0.36, 0.42)

            total_venta_dia = round(total_gastos_dia / porcentaje, 2)
            venta_m = round(total_venta_dia * 0.5, 2)
            venta_n = round(total_venta_dia - venta_m, 2)

            for turno, monto in zip(["mañana", "noche"], [venta_m, venta_n]):
                venta = Venta(
                    fecha=fecha,
                    turno=turno,
                    monto=monto,
                    restaurante_id=restaurante.id
                )
                db.session.add(venta)

    db.session.commit()
    print("✅ Base de datos reiniciada con éxito.")
