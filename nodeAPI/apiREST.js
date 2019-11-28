/* 
    REST api para consultar a ElasticSearch
 Espera variables de entorno:
 ELS_HOSTNAME - hostname del backend elasticsearch. Default value='elasticsearch'
 ELS_PORT - puerto. Default value: 9200

*/
const url = require('url');
const http = require('http');
const request = require('request');
const express = require('express');




var els_hostname = process.env.ELS_HOSTNAME;
    if (!process.env.ELS_HOSTNAME) els_hostname='elasticsearch';
var els_port = process.env.ELS_PORT;
    if (!process.env.ELS_PORT) els_port=9200;

var webserver_port = process.env.WEB_PORT;
    if (!process.env.WEB_PORT) webserver_port=8080;


    const app = express();
    const port = webserver_port;   
    app.get('/',  rootHandler);  
    app.get('/query', simpleQueryHandler);


    app.listen(port, () => console.log(`App en el puerto ${port}!`));


    function rootHandler (req, res) { res.send('Hello World!')};
    

    function simpleQueryHandler (req, res) { 


        var q = url.parse(req.url, true).query;
        console.log(req.method + '-' + req.url);
        console.log(q);
        console.log(q.index + ' - '  + " - " + q.key + "-" + q.value);
        var pathname = req.url.substr(0, req.url.indexOf('?'));
        pathname=pathname.substr(1,pathname.length);
        console.log(pathname);
        var txt='';
        if (q.key && q.value) {
            // txt = buscarELS(q.index, q.key, q.value);
            //res.writeHead(200,  {'Content-Type': 'text/json'});
            //res.send(txt);
            

            var llamado = buscarELS(q.index, q.key, q.value);
            llamado.then(function (resultado) {
                respuestaProcesada = {
                    'cantidadResultados': resultado.hits.total,
                    
                };
               arr = [];
               resultado.hits.hits.forEach(function eachHit(documento) {
                   arr.push(documento._source);
               })
               respuestaProcesada["resultados"] = arr;
                res.status(200).json( respuestaProcesada );

            }, function(err) {
                console.log("Ocurrió un error: " + err);
            }
            )


            
        }
        else {
            message= {"errorMessage":"El método query debe indicar index, key y value"};            
            res.status(400).json(message);

        }

        
        
    };
    

    function  buscarELS(indice, clave, valor) {
        /* busca en el índice seleccionado, que la haya documentos con *valor* en el field *clave* */
        queryJSON= {
            "query" : {"match": {
                
            }}
        };
        queryJSON.query.match[clave] = valor;
        var optionsBuscar = {
            'uri': 'http://' + els_hostname + ':' + els_port + '/' + indice + '/_search',
            'method': 'POST',
            'headers': {
                 'Content-Type': 'application/json'
             },
            'body': JSON.stringify(queryJSON)
        };

        return new Promise(function(resolve, reject) {
            // Do async job
               request.get(optionsBuscar, function(err, resp, body) {
                   if (err) {
                       reject(err);
                   } else {
                       resolve(JSON.parse(body));
                   }
               })
        })
    }


function elasticSearchIndexMultipleDocuments(documents) {

    /**
     *  El parametro documents debe tener el formato:
     * { 
     *   index: nombreDelIndice,
     *   docType: tipoDeDocumento,
     *   docs: [
     *      {}, ## con formato libre del contenido del documento a guardar
     *      {},
     *      ....
     *   ]
     * }
     */
    var optionsSave = {
        'hostname': els_hostname,
        'port': els_port,
        'path': '/' + documents.index + '/' + documents.docType,
        'method': 'POST',
        'headers': {
             'Content-Type': 'application/json'
         }
    };

    documents.docs.forEach(function eachDoc(currDoc) {


        var reqSave = http.request(optionsSave, (res2) => {
	
            res2.on('end', () =>{
                console.debug('statusCode:', res2.statusCode);
            });
        });
        
        reqSave.write(JSON.stringify(currDoc));

        reqSave.on('error', (e) => {
            console.error("Error in ELC call:\n" + e);
        });
        reqSave.end();
    })
}
