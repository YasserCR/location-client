# Location client

## Clonar el repositorio

Para clonar el repositorio, puedes usar el siguiente comando:

```bash
git clone https://github.com/YasserCR/location-client.git
```

## Ejecutar la app
Para ejecutar la app, primero necesitas instalar las dependencias. Puedes hacerlo con el siguiente comando:

```bash
npm install
```

Luego, puedes correr el código con el siguiente comando:

```bash
npm run dev
```

La app apunta directamente al servidor que esta desplegado en: https://theplaces.online/api y la app se encuentra de igual manera desplegada en 
https://app.theplaces.online

Se puede modificar en la capa de servicios, para apuntar a un entorno local si se clona el repositorio del backend si así se prefiere,
aunque ambos apuntan a la misma base de datos.

Link del repositorio de backend: https://github.com/YasserCR/location-server.git

## Requisitos

Este proyecto está hecho con node 16, por lo que no se sabe si pueda presentar problemas en versiones posteriores o anteriores. Puedes verificar tu versión de Node.js con el siguiente comando:

```bash
node --version
v16.20.0