//* para que nosotros le demos accoiones a traves de la db
//*dar errores 404 405 etc 

const {response} =require('express');
const Celular=require('../model/celular');

//#region creacion de un celular
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
//#endregion creacion de un celular

//#region obtener lista de celulares
const getCelular= async(req,res=response)=>{
    const celulares = await Celular.find();
    res.status(200).json({
        ok: true,
        celulares
    })
}
//#endregion obtener lista de celulares

//#region obtener detalles de un celular
const getCelularDetalle=async(req,res=response)=>{
    const id=req.params.id;
    try {
        const celular = await Celular.findById(id);
        //* console.log(`id del celular ${id}`);
        if(!celular){
            return res.status(400).json({
                ok: false,
                msg: 'el celular no existe',
                url:req.url //para ver de donde procede 
            })
        }
        res.status(200).json({
            ok: true,
            celular
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        })
    } 
}
//#endregion obtener detalles de un celular
//#region actualizar  un celular
const putCelularUpdate=async(req,res=response)=>{
    const id=req.params.id;
     const _id=req._id;
    try {
        const celular = await Celular.findById(id);
        //*verificar si el celular no  existe
        if(!celular){
            return res.status(400).json({
                ok: false,
                msg: 'el celular no existe',
                url:req.url //para ver de donde procede 
            })
        }
        //* actualizar los datos
        const modificarDatosCelular={
            ...req.body,
            celular:_id
        }
        const celularActualizado= await Celular.findByIdAndUpdate(id,modificarDatosCelular,{new:true});
        res.status(200).json({
            ok: true,
            celular:celularActualizado
        });
       
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        })
    } 
}

//#endregion actualizar  un celular

//#region eliminar  un celular
const DeleteCelular=async(req,res=response)=>{
   const id=req.params.id;
   try {
    const existeCelular = await Celular.findById(id);
    if (!existeCelular) {
        return res.status(404).json({
            ok: false,
            msg: 'el celular no existe',
            url:req.url //para ver de donde procede
        })
    }
    //*eliminar celular
    await Celular.findByIdAndDelete(id);
    res.status(200).json({
        ok: true,
        msg: 'celular eliminado'
    });
   } catch (error) {
    console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        })
   }
}
//#endregion eliminar  un celular

//#region obtener por marca de un celular
const getMarcaCelular=async(req,res=response)=>{
    const marca=req.params.marca.toLowerCase();
    
    try {
     const celularesEncontrados = await Celular.find({marca});
     
     if (celularesEncontrados.length === 0) {
         return res.status(404).json({
             ok: false,
             msg: 'la marca que ingreso no existe',
         })
     }
     res.status(200).json({
         ok: true,
         cantidad: celularesEncontrados.length,
         celularesEncontrados
     });
    
    } catch (error) {
     console.log(error);
         res.status(404).json({
             ok: false,
             msg: '404 not found'
         })
    }
 }
//#endregion obtener por marca de un celular
module.exports={
    CrearCelular,
    getCelular,
    getCelularDetalle,
    putCelularUpdate,
    DeleteCelular,
    getMarcaCelular
}