const express =require('express');
require('dotenv').config();
const { autenticar } = require('./middlewares/validaciones');
//creacion del servidor
const app = express();
//modulo importado para la base de datos
const {dbCONN} = require('./database/database');
//*primero la conexion luego las rutas
dbCONN();



//*lectura y parseo del body

app.use(express.json());
app.use('', require('./routes/autenticacion'));
app.use('',autenticar,require('./routes/inventario'));
app.use('',autenticar,require('./routes/cliente'));
/*
//prueba de conexion
app.get('/', (req, res) => {
    res.status(200).json({
    ok: true,
    msg: 'conexion estalecida'
    })
})
*/

//creacion del servidor
app.listen( process.env.PUERTO  ,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PUERTO}`);
});
