# elasticsearch-escalable
Este es un laboratorio que presenta un aprovisionamiento escalable de una app con elasticsearch


## Configuración inicial

En el paso inicial, levantamos un cluster de ElasticSearch + Kibana + HEAD plugin

Requerimientos: necesitamos Docker + Docker container instalado. Si no tenemos esta configuración, y sí tenemos posibilidad de virtuaización con VMWare o VirtualBox, recomendamos el uso de Vagrant. 

### Cluster con Vagrant
  ejecutar, parados en el directorio raíz de este repositorio:
 `vagrant up`
  
  Una vez que termina de bajar la box, y de levantar la instancia, ingresar al Ubuntu virtualizado con:

  `vagrant ssh`

  Dentro del Ubuntu, necesitamos realizar una configuración (sólo la primera vez), para aumentar el espacio de direccionamiento del linux virtualizado. En la configuración original que presentamos, la VM tiene 2GB de memoria, esto se puede variar para mejor performance.

  `sudo sysctl -w vm.max_map_count=262144`
  
  Luego, para levantar el cluster:
  ```
  cd /vagrant
  docker-compose up -d
  ```


### Cluster sólo con Docker compose

  ejecutar, parados en el directorio raíz de este repositorio:
  
  `docker-compose up -d`

## Paso 2 - Aplicación cliente

TODO: generar una aplicación en un container, agregado al docker compose, para consumir y cargar datos en el cluster de ElasticSearch

## Paso 3 - Escalabilidad

TODO: análisis entre docker swarm, tecnologías como ECS (de AWS) y Kubernetes



### Créditos
Brigada DevOps