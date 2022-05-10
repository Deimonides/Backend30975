const express = require('express')
//const fs = require('fs');
const Contenedor = require('./desafio_02')
const app = express()
const PORT = 8080

const container = new Contenedor('Productos.txt');

app.get('/', (req, res) => {
    res.end(`<h1 style="color:blue">Bienvenido al servidor express de Gerardo Solotun</h1>`)
})

app.get('/productos', (req, res) => {
    ;(async () => {
        let data = await container.getAll();
        res.send(data);
    })()
})

app.get('/productorandom', (req, res) => {
    ;(async () => {
        let data = await container.getRandom();
        res.send(data);
    })()
})

const server = app.listen( PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => console.log(`! Error en el servidor: ${error}`))
