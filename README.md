# Geo Processor API - FastAPI Docker Setup

Este proyecto contiene una API de FastAPI para procesar puntos geográficos. Puedes correr y probar la API localmente usando Docker.

## Requisitos
- Docker instalado en tu sistema

## Estructura del proyecto
```
geo-processor/
├── app/
│   ├── main.py
│   ├── models.py
│   └── services.py
├── common/
│   └── logger.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
└── README.md
```

## Construir la imagen Docker

Puedes construir la imagen desde la carpeta raíz del proyecto ejecutando:

```bash
docker build -t geo-processor-api .
```

## Ejecutar el contenedor

```bash
docker run --rm -p 8000:8000 geo-processor-api
```

La API estará disponible en [http://localhost:8000](http://localhost:8000)

## Probar la API
Puedes acceder a la documentación interactiva en:

- [http://localhost:8000/docs](http://localhost:8000/docs)

## Logs
Todos los logs del servidor y del logger personalizado se mostrarán en la consola del contenedor.

## Ejecutar tests localmente (opcional)


## Ejecutar tests

### En local
Instala las dependencias y ejecuta los tests:

```bash
pip install -r requirements.txt
PYTHONPATH=geo-processor pytest. # para test solo un modulo
```
