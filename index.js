const express =require('express');

//creacion del servidor
const app = express();

app.get('/', (req, res) => {
    res.status(404).json({
    ok: true,
    msg: 'conexion estalecida'
    })
})


//creacion del servidor
app.listen(3000,()=>{
    console.log("servidor corriendo en el puerto 3000");
})

