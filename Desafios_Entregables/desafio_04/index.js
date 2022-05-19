const express = require('express')
const Contenedor = require('./contenedor')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('api'))

const server = app.listen( PORT, () => {
    console.log(`> Servidor escuchando en el puerto: ${PORT}`)
})
server.on('error', (error) => console.log(`! Error en el servidor: ${error}`)) 

const contenedor = new Contenedor('Productos.txt')

app.get('/', (req, res) => {
    res.send(`Petición recibida a la URL "${req.url}", con el método "${req.method}"`)
})

app.get('/productos', async (req, res) => {
    //res.send(`Petición recibida a la URL "${req.url}", con el método "${req.method}"`)
    const productos = await contenedor.getAll()
    console.log(productos)
    return res.json(productos)
})

app.get('/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const productos = await contenedor.getById(id)
    console.log(productos)
    return res.json(productos)
})

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body
    //console.log(`Producto nuevo: ${JSON.stringify(nuevoProducto) }`);
    //const productoAgregado = contenedor.save(nuevoProducto)
    //console.log(productoAgregado);
    //res.send(`Nuevo producto guardado: "${ JSON.stringify(nuevoProducto) }"`)
    return res.json(contenedor.save(nuevoProducto))
})

app.delete('/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    await contenedor.deleteById(id)
    return res.send(id)
})