const express =require('express');
require('dotenv').config();
//creacion del servidor
const app = express();
//modulo importado para la base de datos
const {dbCONN} = require('./database/database');
//dbCONN();
app.use('',require('./routes/inventario'));

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
