# Proyecto de Hábitos - Semana 1

Este proyecto corresponde a la Semana 1.

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Dotenv
- Nodemon

## Requisitos
- Node.js instalado
- npm instalado
- Una cuenta en MongoDB Atlas

## Instalación
1. Clonar el repositorio
2. Abrir la carpeta del proyecto en Visual Studio Code
3. Instalar las dependencias con el siguiente comando:

npm install

## Variables de entorno
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

MONGODB_URI=String de MongoDB
PORT=3000

## Ejecución del proyecto
Para correr el proyecto en modo desarrollo usar:

npm run dev

## Endpoints disponibles, probados en Thunder Client

### Crear hábito
POST /habits

### Obtener hábitos
GET /habits

### Actualizar hábito
PUT /habits/:id

### Eliminar hábito
DELETE /habits/:id

## Notas
Este proyecto incluye la configuración inicial del backend, conexión a MongoDB Atlas y operaciones básicas para gestionar hábitos.