//* para que nosotros le demos accoiones a traves de la db
//*dar errores 404 405 etc 

const {response} =require('express');
const Celular=require('../model/celular');
const celular = require('../model/celular');

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
        res.status(404).json({
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
            msg:'celular actualizado correctamente',
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
        return res.status(400).json({
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
     const celularesEncontrados = await Celular.find({marca,vendido:false});
     
     if (celularesEncontrados.length === 0) {
         return res.status(400).json({
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

//#region mosrar rango entre precios
const getCompararPreciosCelular=async(req,res=response)=>{
    const minimo=parseInt( req.params.minimo);
    const maximo=parseInt( req.params.maximo);
    //console.log( minimo , maximo);
    try {
        const celulares = await Celular.find({ precio:  { $gte: minimo, $lte: maximo },vendido:false}).sort({precio:-1});
        
        res.status(200).json({
            ok: true,
            total: celulares.length,
            celulares
        });
    
    } catch (error) {
     console.log(error);
         res.status(404).json({
             ok: false,
             msg: '404 not found'
         })
    }
 }
//#endregion mosrar rango entre precios


//#region mosrar por catntidad de ram
const getRam=async(req,res=response)=>{
    const ram = parseInt(req.params.ram);
    try {
       // Buscar celulares con la cantidad de RAM especificada
       const celulares = await Celular.find({vendido:false}).lean(); // Utilizamos lean() para obtener un JSON plano en lugar de objetos Mongoose

       //* Filtrar celulares que tienen la cantidad de RAM especificada
       const celularesConRamEspecifica = celulares.filter(celular => {
           // Extraer la cantidad de RAM del campo 'ram' y convertirla a números
           const ramArray = celular.ram.split('+').map(item => parseInt(item));

           // Sumar la cantidad de RAM
           const cantidadRam = ramArray.reduce((total, num) => total + num, 0);

           // Comparar con la cantidad de RAM especificada
           return cantidadRam === ram;
       });
        if (celularesConRamEspecifica.length === 0) {
           return res.status(400).json({
               ok: false,
               msg: `No se encontraron celulares con la cantidad de RAM ${ram}`
           });
       }
       res.status(200).json({
           ok: true,
           total: celularesConRamEspecifica.length,
           celulares: celularesConRamEspecifica
       });

        
    
    } catch (error) {
     console.log(error);
         res.status(404).json({
             ok: false,
             msg: '404 not found'
         })
    }
 }
//#endregion mosrar por catntidad de ram


//#region mosrar por color
const getColor=async(req,res=response)=>{
    const color = req.params.color.toLowerCase();
    try {
        const celulares = await Celular.find({vendido:false}).lean();
        const celularesConColorEspecifico = celulares.filter(celular => {
            // *Convertimos los colores a minúsculas y los separamos en un array
            const coloresCelular = celular.color.toLowerCase().split(',').map(c => c.trim());
            console.log(coloresCelular);
            // *Verificamos si el color especificado está en la lista de colores del celular
            return coloresCelular.includes(color);
        });

        //* ordear por precio de menor a mayor
        celularesConColorEspecifico.sort((a, b) => a.precio - b.precio);
        if (celularesConColorEspecifico.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: `no se encontraron celulares de color : ${color}`
            });
        }
        res.status(200).json({
            ok: true,
            total: celularesConColorEspecifico.length,
            celulares: celularesConColorEspecifico
        });
    } catch (error) {
     console.log(error);
         res.status(404).json({
             ok: false,
             msg: '404 not found'
         })
    }
 }
//#endregion mosrar por color

//#region mosrar por porcentaje y calcular el total de descuento
const getDesc=async(req,res=response)=>{
    const imei = req.params.imei
    try {
        const celulares = await Celular.find({imei:imei});
        console.log(celulares);
        if(celulares.length===0){
            return res.status(400).json({
                ok: false,
                msg: 'el celular no existe',
                //url:req.url //para ver de donde procede 
            })
        }
        
        // Obtener el primer celular encontrado (suponiendo que solo hay uno)
        const celular = celulares[0];
        if(celular.vendido){
            return res.status(400).json({
                ok: false,
                msg: 'el celular ha sido vendido',
                //url:req.url //para ver de donde procede 
            })
        }

        // * ver el precio actual (sin descuento)
        const precioActual = celular.precio;

        // Calcular el descuento en número (convertir el porcentaje a número)
        const descuentoNumero = parseFloat(celular.descuento);
        const totalDescuento = (precioActual * (descuentoNumero / 100));

        // Calcular el precio con descuento
        const precioConDescuento = precioActual - totalDescuento ;

        res.status(200).json({
            ok: true,
            celulares: [{
                ...celular.toObject(), // Convertir el documento Mongoose a objeto JavaScript
                precioActual: precioActual,
                precioConDescuento: precioConDescuento,
                descuentoNumero: totalDescuento
            }]
        });
    } catch (error) {
     console.log(error);
         res.status(404).json({
             ok: false,
             msg: '404 not found'
         })
    }
 }
//#endregion mosrar por porcentaje y calcular el total de descuento

//#region vender un celular
const putVender = async (req, res = response) => {
    const imei = req.params.imei;
    try {
        const celulares = await Celular.find({ imei: imei });
        if (celulares.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El celular no existe'
            });
        }
        
        // Obtener el primer celular encontrado (suponiendo que solo hay uno)
        const celular = celulares[0];

        // Verificar si el celular ya está vendido
        if (celular.vendido) {
            return res.status(400).json({
                ok: false,
                msg: 'El celular ya ha sido vendido'
            });
        }

        // Marcar el celular como vendido
        celular.vendido = true;

        // Guardar los cambios en la base de datos
        await celular.save();

        // Calcular el precio con descuento
        const precioActual = celular.precio;
        const descuentoNumero = parseFloat(celular.descuento);
        const totalDescuento = (precioActual * (descuentoNumero / 100));
        const precioConDescuento = precioActual - totalDescuento;

        res.status(200).json({
            ok: true,
            msg: 'El celular ha sido vendido',
            celular: {
                ...celular.toObject(), // Convertir el documento Mongoose a objeto JavaScript
                precioActual: precioActual,
                precioConDescuento: precioConDescuento,
                descuentoNumero: totalDescuento
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
}

//#endregion vender un celular


//#region vender un celular
const getVendidos = async (req, res = response) => {
    try {
        const celulares = await Celular.find({ vendido: true });
        if (celulares.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay celulares vendidos'
            });
        }
        res.status(200).json({
            ok: true,
            total: celulares.length,
            celulares: celulares
        });
      
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
}

//#endregion vender un celular
module.exports={
    CrearCelular,
    getCelular,
    getCelularDetalle,
    putCelularUpdate,
    DeleteCelular,
    getMarcaCelular,
    getCompararPreciosCelular,
    getRam,
    getColor,
    getDesc,
    putVender,
    getVendidos


}