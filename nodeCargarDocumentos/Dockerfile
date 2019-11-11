FROM node:10.17.0-alpine
WORKDIR /apps/

 ARG ELS_HOSTNAME 
 ENV ELS_HOSTNAME=$ELS_HOSTNAME

 ARG ELS_HOSTNAME 
 ENV ELS_PORT=$ELS_HOSTNAME

COPY ./cargaDocumentos.js /apps/
COPY ./data /apps/data
CMD node cargaDocumentos.js