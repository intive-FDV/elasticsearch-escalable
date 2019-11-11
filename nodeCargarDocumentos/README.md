# Carga de Documentos (nodejs)
Esta aplicación sencilla carga datos en el elasticsearch local.


## Configuración inicial

En la instancia en la que se esté trabajando, no existirá seguramente una imagen Docker de esta instancia, por lo que como primer paso debería generarse la imagen, y luego agregar al docker-compose.yml principal el servicio

### Generar la imagen Docker
  ejecutar, parados en este directorio
 `docker build -t cargar_documentos .`
  

### Agregar a docker compose

  Si queremos que esta imagen pueda ejecutarse como contenedor dentro de la misma red de docker, debemos agregar el servicio al docker-compose.yml original. De otra manera, ejecutar (en el siguiente título) el contenedor.
  
  Al docker-compose.yml del directorio raiz, agregar:
  ```
  servicio_cargar_documentos:
    image: cargar_documentos
    container_name: c_cargar_documentos
    environment:
      - ELS_HOSTNAME=elasticsearch
      - ELS_POST=9200
  ```

y ejecutar (en la carpeta raíz):

    `docker-compose up -d`

    ## TO do  :fixear, no funciona ELS luego de agregar esto
## Como container separado

Dentro del container, 127.0.0.1 no es la ip del host, sino del mismo container
`docker run -d --env ELS_HOSTNAME=127.0.0.1 --env ELS_PORT=9200 cargar_documentos:v2`
 

### Créditos
Brigada DevOps