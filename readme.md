
# Invoice Generator API

## Descripción

Esta aplicación gestiona facturas (**invoices**) y clientes. Permite crear facturas, modificar productos, leer información de clientes, eliminar entidades lógicamente, y manejar facturas en lote desde un archivo Excel. La aplicación está escrita en **TypeScript** usando **Node.js** y **Express.js**, y utiliza **PostgreSQL** como base de datos.

### Funcionalidades:

- CRUD de clientes
- CRUD de productos
- Creación de facturas en lote desde un archivo Excel
- Relación de facturas con productos (Many-to-Many)
- Manejo de transacciones y fallos en la creación de facturas
- Base de datos en PostgreSQL
- Contenedorización usando Docker

---

## Cómo levantar el proyecto

### Opción 1: Con Docker

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/andresguaita/invoice_generator_api.git
   cd invoice_generator_api
   ```

2. Asegúrate de tener Docker instalado y corriendo. Luego, ejecuta:

   ```bash
   docker-compose up --build
   ```

   Esto levantará tanto la base de datos PostgreSQL como la aplicación.

### Opción 2: Sin Docker

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/andresguaita/invoice_generator_api.git
   cd invoice_generator_api
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear la base de datos PostgreSQL localmente y asegurarse de configurar las variables de entorno en un archivo `.env`:

   ```bash
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=invoices_db
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=user
   DB_PASSWORD=password
   DB_NAME=invoices_db
   ```


4. Iniciar la aplicación en modo desarrollo:

   ```bash
   npm run start:dev
   ```

---

## Endpoints

### Clientes

#### `GET /clients/`
- Descripción: Obtiene los detalles de un cliente por ID.
- Parámetros de ruta: `id` (número, obligatorio)

#### `POST /clients`
- Descripción: Crea un nuevo cliente.
- Body:
   ```json
   {
     "name": "Nombre del cliente",
     "email": "email@ejemplo.com",
     "address": "Dirección del cliente"
   }
   ```

#### `PUT /clients/`
- Descripción: Modifica los detalles de un cliente por ID.
- Parámetros de ruta: `id` (número, obligatorio)
- Body:
   ```json
   {
     "name": "Nuevo nombre",
     "email": "nuevoemail@ejemplo.com",
     "address": "Nueva dirección"
   }
   ```

#### `DELETE /clients/`
- Descripción: Elimina lógicamente un cliente por ID.
- Parámetros de ruta: `id` (número, obligatorio)

---

### Productos

#### `GET /products/`
- Descripción: Obtiene los detalles de un producto por ID.
- Parámetros de ruta: `id` (número, obligatorio)

#### `POST /products`
- Descripción: Crea un nuevo producto.
- Body:
   ```json
   {
     "name": "Nombre del producto",
     "price": 100.0,
     "stock": 10
   }
   ```

#### `PUT /products/`
- Descripción: Modifica los detalles de un producto por ID.
- Parámetros de ruta: `id` (número, obligatorio)
- Body:
   ```json
   {
     "name": "Nuevo nombre",
     "price": 120.0,
     "stock": 10
   }
   ```

#### `DELETE /products/`
- Descripción: Elimina lógicamente un producto por ID.
- Parámetros de ruta: `id` (número, obligatorio)

---

### Facturas

#### `POST /invoices`
- Descripción: Crea una nueva factura.
- Body:
   ```json
   {
     "clientId": 1,
     "amount": 500,
     "productIds": [1, 2]
   }
   ```

#### `POST /invoices/batch`
- Descripción: Crea facturas en lote desde un archivo Excel.
- Body: El archivo debe ser subido como `multipart/form-data` con el campo `file`.

#### `GET /invoices/`
- Descripción: Obtiene los detalles de una factura por ID.
- Parámetros de ruta: `id` (número, obligatorio)

#### `GET /invoices`
- Descripción: Lista todas las facturas de manera paginada.
- Query Params (opcional): `page` (número), `limit` (número)

---

