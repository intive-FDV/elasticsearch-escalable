/* Monitoring queue consumer */
const http = require('http');
const fs = require('fs');


/* Espera variables de entorno:
 ELS_HOSTNAME - hostname del backend elasticsearch. Default value='elasticsearch'
 ELS_PORT - puerto. Default value: 9200

*/

var hostname = process.env.ELS_HOSTNAME;
    if (!process.env.ELS_HOSTNAME) hostname='elasticsearch';
var port = process.env.ELS_PORT;
    if (!process.env.ELS_PORT) port=9200;
var path = process.env.INPUT_FILES_PATH;
    if (!process.env.INPUT_FILES_PATH) path="./data/";

cargaInicial();




function cargaInicial(){

    fs.readdir(path, function(err, items) {
        console.log(items);
    
        for (var i=0; i<items.length; i++) {
            let fileContent = fs.readFileSync(path  + '/' + items[i]);
            let documents = JSON.parse(fileContent);
            elasticSearchIndexMultipleDocuments(documents);
        }
    });
/*
    let fileContent = fs.readFileSync('data/libros.json');
    let documents = JSON.parse(fileContent);
    elasticSearchIndexMultipleDocuments(documents);*/
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
        'hostname': hostname,
        'port': port,
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
