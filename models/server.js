const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/dbconnection');

class Server {
    constructor() {

        this.app = express();
        this.rootPath = '/agencia';
        this.port = process.env.PORT || 3000;
        
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.rootPath,require('../router/usuarios'))
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}


module.exports = Server;