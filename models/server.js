const express = require('express');
const cors    = require('cors');

class Server{

    constructor(){
        this.app       = express();
        this.port      = process.env.PORT;
        this.usersPath = '/api-users/v1/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }


    middlewares(){

        //cors
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );
        
        //Directorio publico
        this.app.use( express.static('public') );
    }


    routes(){
        this.app.use(this.usersPath, require('../routes/users'));        
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}


module.exports = Server;