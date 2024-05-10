const mongoose = require('mongoose');

//conexion a la base de datos

const dbCONN= async ()=>{
try {
    await mongoose.connect(process.env.db_CONNECTION,{
       
    });
    console.log('base de datos conectada');
} catch (error) {
    console.log(error);
    process.exit(1);
}


}

module.exports = {dbCONN};