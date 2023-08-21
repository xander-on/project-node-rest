const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

const urlBase = '/api-users'

class Server{

    constructor(){
        this.app   = express();
        this.port  = process.env.PORT || 3000;

        this.paths = {
            auth       : `${urlBase}/v1/auth`,
            categories : `${urlBase}/v1/categories`,
            products   : `${urlBase}/v1/products`,
            search     : `${urlBase}/v1/search`,
            users      : `${urlBase}/v1/users`,
        }

        //Conectar a db
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){

        //cors
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( urlBase, express.static('public') );
        // this.app.use( `${urlBase}/v1`, express.static('public') );

    }


    routes(){
        this.app.use( this.paths.auth,       require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products,   require('../routes/products'));
        this.app.use( this.paths.users,      require('../routes/users'));
        this.app.use( this.paths.search,     require('../routes/search'))
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}


module.exports = Server;
