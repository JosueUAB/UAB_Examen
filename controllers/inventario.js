//* para que nosotros le demos accoiones a traves de la db
//*dar errores 404 405 etc 

const {response} =require('express');
const Celular=require('../model/celular');
const CrearCelular=async(req,res = response)=>{
    //*desectruccturacion del libro
    const {imei}=req.body;

    try {
        //!verificacion si existe los imei
        const existeCelular= await Celular.findOne({imei});
        if(existeCelular){
            return res.status(400).json({
                ok: false,
                msg: 'el celular ya existe',
                url:req.url //para ver de donde prcede 
            })
        }
        //*instancia dl modelo del celular
        const celular= new Celular(req.body);
        //*crear libro en la base de datos
        await celular.save();
        res.status(201).json({
            ok: true,
            msg: 'celular creado',
            _id:celular.id, // *se trae el id del celular
            url:req.url,    //* muestra de donde viene el endpoint
            celular     //* se trae todo lo que tenga esa tabla
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 bad request'
        })
    }
}

module.exports={
    CrearCelular,
}