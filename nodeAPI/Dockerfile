FROM node:10.17.0-alpine
WORKDIR /apps/

 ARG ELS_HOSTNAME 
 ENV ELS_HOSTNAME=$ELS_HOSTNAME

 ARG ELS_HOSTNAME 
 ENV ELS_PORT=$ELS_HOSTNAME

COPY ./apiREST.js /apps/
RUN npm install request
RUN npm install express
EXPOSE 8080
CMD node apiREST.js