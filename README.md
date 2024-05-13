### NODE API REST EXAMEN TALLER DE APLICACIONES DE INTERNET
![plataforma de desarrollo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png "plataforma de desarrollo")

- Desarrollar una API para una tienda donde se venden articulos tecnologicos entre su mayoria telefonos celulares.
- para base de datos se utiliza Mongo DB y como ORM mongoose que nos facilita las consultas en mongodb
- el proyecto cuenta con su respectivo crud
- a continuacion se encontraran una secuencia de los request o los endpoint para que puedan usar la API
- **el puerto que se esta  utilizando es el 3000**

#### Datos del Estudiante
###### nombre:  Arista Huanca Josue Israel
###### curso:  2º Sistemas Complementaro



# Crear un celular en base de datos
```
POST http://localhost:3000/lista
** envio del json **
{
        "marca": "tecno",
        "modelo": "Spark 6 Go",
        "color": "negro",
        "almacenamiento": "64gb",
        "ram": "4gb",
        "bateria": 5000,
        "imei": "00014",
        "precio": 150,
        "descuento": "5%"
    }
respuesta 
{
	"ok": true,
	"msg": "celular creado",
	"_id": "663feb7c769d4f6fc7ce15c7",
	"url": "/lista",
	"celular": {
		"marca": "tecno",
		"modelo": "Spark 6 Go",
		"color": "negro",
		"almacenamiento": "64gb",
		"ram": "4gb",
		"bateria": 5000,
		"imei": "00014",
		"precio": 150,
		"descuento": "5%",
		"_id": "663feb7c769d4f6fc7ce15c7",
		"__v": 0
	}
}

```
- **400 "error" ** el celular ya existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **201 "msg" ** celular creado

# obtener el inventario de todos los celulares
```
GET http://localhost:3000/lista
*** respuesta del json ***
{
	"ok": true,
	"celulares": [
		{
			"_id": "663fca9de39a7b6b63e42863",
			"marca": "samsung",
			"modelo": "j7 prime",
			"color": "dorado",
			"almacenamiento": "64gb",
			"ram": "4gb",
			"bateria": 3000,
			"imei": "00001",
			"precio": 350,
			"descuento": "5%",
			"__v": 0
		},
		{
			"_id": "663fcabbe39a7b6b63e4286a",
			"marca": "samsung",
			"modelo": "j7 pro",
			"color": "verde",
			"almacenamiento": "16gb",
			"ram": "32gb",
			"bateria": 3000,
			"imei": "00002",
			"precio": 430,
			"descuento": "33",
			"__v": 0
		}

```
- **200 "msg" ** exitoso
# buscar un celular y obtener detalles por id
```
GET 						/ID
http://localhost:3000/lista/663fcabbe39a7b6b63e4286a
{
	"ok": true,
	"msg": "celular creado",
	"_id": "663feb7c769d4f6fc7ce15c7",
	"url": "/lista",
	"celular": {
		"marca": "tecno",
		"modelo": "Spark 6 Go",
		"color": "negro",
		"almacenamiento": "64gb",
		"ram": "4gb",
		"bateria": 5000,
		"imei": "00014",
		"precio": 150,
		"descuento": "5%",
		"_id": "663feb7c769d4f6fc7ce15c7",
		"__v": 0
	}
}
```

- **400 "error" ** el celular ya existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celular encontrado


# actualizar los datos de un celular por id
```
PUT							/ID
http://localhost:3000/lista/663fcc0ef5d5e6361ccb0ea8
JSON ENVIADO
{
		"marca": "samsung",
		"modelo": "j7 pro",
		"color": "verde",
		"almacenamiento": "128gb",
		"ram": "16gb",
		"bateria": 5000,
		"imei": "00003",
		"precio": 430,
		"descuento": "33"
}
Respuesta Json

{
	"ok": true,
	"msg": "celular actualizado correctamente",
	"celular": {
		"_id": "663fcc0ef5d5e6361ccb0ea8",
		"marca": "samsung",
		"modelo": "j7 pro",
		"color": "verde",
		"almacenamiento": "128gb",
		"ram": "16gb",
		"bateria": 5000,
		"imei": "00003",
		"precio": 430,
		"descuento": "33",
		"__v": 0
	}
}

```
- **400 "error" ** el celular ya existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celular actualizado correctamente
# eliminar un celular por id

```
delete 						id
http://localhost:3000/lista/663feb30769d4f6fc7ce15b5
respuesta del json
{
	"ok": true,
	"msg": "celular eliminado"
}

```

- **400 "error" ** el celular no existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celular actualizado correctamente
# obtener inventario por marca 

- **detalle ** esta consulta lista los celulares que no estan vendidos
- **detalle ** tambien nos muestra la cantidad de celulares listados
```
GET  						/parametro a buscar
http://localhost:3000/marca/realme

respuesta json
{
	"ok": true,
	"cantidad": 3,
	"celularesEncontrados": [
		{
			"_id": "663feb55769d4f6fc7ce15bb",
			"marca": "realme",
			"modelo": "Realme 7",
			"color": "blanco",
			"almacenamiento": "128gb",
			"ram": "8gb",
			"bateria": 5000,
			"imei": "00010",
			"precio": 250,
			"descuento": "15%",
			"__v": 0
		},
		{
			"_id": "663feb6f769d4f6fc7ce15c4",
			"marca": "realme",
			"modelo": "Realme 6 Pro",
			"color": "verde",
			"almacenamiento": "128gb",
			"ram": "8gb",
			"bateria": 4300,
			"imei": "00013",
			"precio": 270,
			"descuento": "10%",
			"__v": 0
		},
		{
			"_id": "663fed3e885cd4681543c266",
			"marca": "realme",
			"modelo": "Realme 8",
			"color": "negro",
			"almacenamiento": "128gb",
			"ram": "8gb",
			"bateria": 5000,
			"imei": "00017",
			"precio": 1400,
			"descuento": "10%"
		}
	]
}

```

- **400 "error" ** la marca del celular no existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados
# obtener celulares entre 2 precios minimo y maximo

- **detalle ** esta consulta lista los celulares que no estan vendidos
- **detalle ** tambien nos muestra la cantidad de celulares listados
```
GET 						/valor_minimo/valor_maximo
http://localhost:3000/precio/100/500

respuestaa json 
{
	"ok": true,
	"total": 20,
	"celulares": [
		{
			"_id": "663fefe7885cd4681543c27e",
			"marca": "Motorola",
			"modelo": "Moto E6s",
			"color": "plata",
			"almacenamiento": "64gb",
			"ram": "4gb",
			"bateria": 3000,
			"imei": "00039",
			"precio": 490,
			"descuento": "5%"
		},
		{
			"_id": "663fefe7885cd4681543c27c",
			"marca": "Samsung",
			"modelo": "Galaxy A03",
			"color": "azul",
			"almacenamiento": "32gb",
			"ram": "3gb",
			"bateria": 5000,
			"imei": "00037",
			"precio": 470,
			"descuento": "8%"
		},



```

- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados

# obtener celulares por la cantidad de ram

- **detalle ** esta consulta lista los celulares que no estan vendidos
- **detalle ** tambien nos muestra la cantidad de celulares listados 
```
GET 					  /Valor_numerico
http://localhost:3000/ram/6
respuesta json
{
	"ok": true,
	"total": 8,
	"celulares": [
		{
			"_id": "663feac2769d4f6fc7ce15b2",
			"marca": "xiaomi",
			"modelo": "Redmi Note 8",
			"color": "azul",
			"almacenamiento": "128gb",
			"ram": "6gb",
			"bateria": 4500,
			"imei": "00007",
			"precio": 300,
			"descuento": "10%",
			"__v": 0
		},

		{
			"_id": "6640c75829fe4802a4c7112a",
			"marca": "Xiaomi",
			"modelo": "Redmi Note 8",
			"color": "azul",
			"almacenamiento": "128gb",
			"ram": "4+2gb",
			"bateria": 4500,
			"imei": "00044",
			"precio": 550,
			"descuento": "10%"
		},
		


```
- **400 "error" ** la cantidad de ram no se encuentra
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados

# obtener celulares por el color y ordenarlos de menor a mayor
- **detalle ** esta consulta lista los celulares que no estan vendidos
- **detalle ** tambien nos muestra la cantidad de celulares listados
```
GET 						/color_a_buscar
http://localhost:3000/color/negro

respuesta json
{
	"ok": true,
	"total": 14,
	"celulares": [
		{
			"_id": "663feb7c769d4f6fc7ce15c7",
			"marca": "tecno",
			"modelo": "Spark 6 Go",
			"color": "negro",
			"almacenamiento": "64gb",
			"ram": "4gb",
			"bateria": 5000,
			"imei": "00014",
			"precio": 150,
			"descuento": "5%",
			"__v": 0
		},
```
- **400 "error" ** el color no esta disponible en la tienda
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados con ese color
#  buscar por imei y calcular el descuento y el total
- **detalle ** esta consulta lista los celulares que estan vendidos
- **detalle ** en caso de que este este vendido nos muestra el estado de vendido
- **detalle ** tambien nos muestra la cantidad de celulares listados

```
GET 						/imei_del_equipo_a_buscar
http://localhost:3000/buscar/00001

respuesta json
{
	"ok": true,
	"celulares": [
		{
			"_id": "663fca9de39a7b6b63e42863",
			"marca": "samsung",
			"modelo": "j7 prime",
			"color": "dorado",
			"almacenamiento": "64gb",
			"ram": "4gb",
			"bateria": 3000,
			"imei": "00001",
			"precio": 350,
			"descuento": "5%",
			"__v": 0,
			"precioActual": 350,
			"precioConDescuento": 332.5,
			"descuentoNumero": 17.5
		}
	]
}
```
- **400 "error" ** el color no esta disponible en la tienda o el celular se encuentra vendido
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados con ese color


#  vender por imei y calcular el descuento y el total

```
GET 						/imei_del_equipo_a_buscar
http://localhost:3000/vender/00002

respuesta json
{
	"ok": true,
	"msg": "El celular ha sido vendido",
	"celular": {
		"vendido": true,
		"_id": "663fcabbe39a7b6b63e4286a",
		"marca": "samsung",
		"modelo": "j7 pro",
		"color": "verde",
		"almacenamiento": "16gb",
		"ram": "32gb",
		"bateria": 3000,
		"imei": "00002",
		"precio": 430,
		"descuento": "33",
		"__v": 0,
		"precioActual": 430,
		"precioConDescuento": 288.1,
		"descuentoNumero": 141.9
	}
}

```
- **400 "error" ** el celular ya ha sido vendido o el celular no existe
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares encontrados con ese color

#  ver celulares vendidos

```
GET 						
http://localhost:3000/vender

respuesta json
ok": true,
	"total": 4,
	"celulares": [
		{
			"_id": "663fca9de39a7b6b63e42863",
			"marca": "samsung",
			"modelo": "j7 prime",
			"color": "dorado",
			"almacenamiento": "64gb",
			"ram": "4gb",
			"bateria": 3000,
			"imei": "00001",
			"precio": 350,
			"descuento": "5%",
			"__v": 0,
			"vendido": true
		},

```
- **400 "error" ** no hay celulare vendidos
- **404 "error" ** la pagina donde se intenta acceder no existe
- **200 "msg" ** celulares vendidos encontrados
