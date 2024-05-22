const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const inventarioRuta = require('../../routes/inventario');
const inventarioModel = require('../../model/celular');
require('dotenv').config();
const { dbCONN } = require('../../database/database');

const app = express();
app.use(express.json());
app.use('', inventarioRuta);

describe('Pruebas Unitarias para Inventario de Celulares', () => {
  beforeAll(async () => {
    await dbCONN({ 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    await inventarioModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close(); 
  });

  //#region1 1er test
  test('Traer todos los celulares - Método: GET getCelular', async () => {
    await inventarioModel.create({
      marca: "ZTE",
      modelo: "black edition",
      color: "negro, azul",
      almacenamiento: "256gb",
      ram: "8+4gb",
      bateria: 5000,
      imei: "00098",
      precio: 3000,
      descuento: "20%"
    });

    await inventarioModel.create({
      marca: "samsung",
      modelo: "j1 ace",
      color: "azul",
      almacenamiento: "8gb",
      ram: "3gb",
      bateria: 2000,
      imei: "00099",
      precio: 200,
      descuento: "10%"
    });

    // Solicitud request utilizando supertest
    const res = await request(app).get('/lista'); 

    // Verificar respuesta
    expect(res.statusCode).toEqual(200);
    expect(res.body.celulares).toHaveLength(2);
  }, 10000);
  //#endregion1 1er test

  //#region2 2do test agregar un nuevo celular
  test('Crear un nuevo celular - Método: POST crearCelular', async () => {
    const nuevocel = {
      marca: "samsung",
      modelo: "galaxy s21",
      color: "negro",
      almacenamiento: "128gb",
      ram: "8gb",
      bateria: 4000,
      imei: "00100",
      precio: 700,
      descuento: "15%"
    };

    const res = await request(app)
      .post('/lista')
      .send(nuevocel);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.celular.marca).toEqual(nuevocel.marca);
    expect(res.body.celular.imei).toEqual(nuevocel.imei);
    expect(res.body.celular.precio).toEqual(nuevocel.precio);
    expect(res.body.celular.descuento).toEqual(nuevocel.descuento);
  }, 10000);

  //#endregion2 2do test

  //#region3 3er test buscar y obtener detalles
  
  test('Buscar y obtener detalles de un celular - Método: GET getCelularDetalle', async () => {
    const nuevocel = {
      marca: "huawei",
      modelo: "y6p",
      color: "negro",
      almacenamiento: "8gb",
      ram: "4gb",
      bateria: 3000,
      imei: "00102",
      precio: 300,
      descuento: "20%"
    };
  
    // Crear un nuevo celular y capturar su _id
    const crearRes = await request(app)
      .post('/lista')
      .send(nuevocel);
  
    const nuevoCelularId = crearRes.body.celular._id;
  
    // Solicitud GET para obtener detalles del celular utilizando su _id
    const res = await request(app).get('/lista/' + nuevoCelularId);
  
    // Verificar respuesta
    expect(res.statusCode).toEqual(200);
    expect(res.body.celular.marca).toEqual(nuevocel.marca);
    expect(res.body.celular.imei).toEqual(nuevocel.imei);
  });
  

  //#endregion3 3er test buscar y obtener detalles
  


    //region4 actualizar un celular que ya existe
    test('Actualizar un celular que ya existe en la base de datos - Método: PUT putCelularUpdate', async () => {
        const celularCreado = await inventarioModel.create({
            marca: "huawei",
            modelo: "y6p",
            color: "negro",
            almacenamiento: "8gb",
            ram: "4gb",
            bateria: 3000,
            imei: "00105",
            precio: 300,
            descuento: "20%"
        });
    
        const celularActualizar = {
            marca: "huawei (editado)",
            modelo: "y6p (editado)",
            color: "negro (editado)",
            almacenamiento: "8gb (editado)",
            ram: "4gb (editado)",
            bateria: 4000,
            precio: 500,
            descuento: "20% (editado)"
        };
        const res = await request(app)
            .put('/lista/' + celularCreado._id)
            .send(celularActualizar);
        //console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body.celular.modelo).toEqual(celularActualizar.modelo);
    });
    //#endregion4 actualizar un celular que ya existe
    
});
