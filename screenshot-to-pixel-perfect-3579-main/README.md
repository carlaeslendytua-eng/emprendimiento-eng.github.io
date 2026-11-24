# ENTRE SÍ — Proyecto para Visual Studio Code

Proyecto basado en la exportación original de Lovable, ampliado con las páginas **Inicio**, **Ferias**, **Quiénes somos**, **Planes**, **Registro de microempresas** y el módulo de **Asistentes / afinidad / mapa / guardadas** previamente existente.

## Ejecutar en VS Code
1. Instalar Node.js 22 o superior.
2. Abrir esta carpeta en Visual Studio Code.
3. Terminal: `npm install`
4. Terminal: `npm run dev`
5. Abrir la URL local anunciada por Vite.

## Construir
`npm run build`

## Publicar sin tener VS Code abierto
El proyecto usa TanStack Start y necesita un alojamiento compatible con el servidor generado y sus variables de entorno. Para publicación real, conectar el repositorio a un servicio de despliegue compatible; configurar el backend y las credenciales en el servidor. Luego funcionará sin mantener VS Code ni tu computadora encendidos. `npm run dev` es solo desarrollo local.

## IMPORTANTE: Funciones pendientes de backend
- Las tarjetas de ferias nacionales son **EJEMPLOS**, no ferias verificadas o inscripciones abiertas.
- El formulario de registro muestra la solicitud, pero no crea una cuenta ni envía datos.
- No se cobran $2,50, no se activa ninguna membresía ni se permite acceso a datos exclusivos sin servidor y pago verificado.
- La funcionalidad de afinidad, perfiles de marcas y mapa heredada de Lovable utiliza datos de demostración.
- Antes de producción se requieren autenticación, autorización segura por rol, información de ferias verificada, pasarela de cobro con webhooks, protección de datos y pruebas de extremo a extremo.

No incluyas `.env` con credenciales en archivos compartidos o repositorios públicos. Se excluyó del ZIP de entrega. Utiliza un archivo `.env` creado localmente y configura las variables necesarias según tu proveedor, sin exponer secretos.

## Retroalimentación CONQUITO
El video alojado en Google Drive (~2.81 GB) no pudo leerse desde este entorno. Esta entrega refleja los requisitos escritos del usuario, NO observaciones no verificadas del video.
