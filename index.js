const express = require('express')
const router_productos = require('./routes/Router_Productos')
const router_carrito = require('./routes/Router_Carrito')
const PORT = 8080
const app = express()

app.use('/api/productos', router_productos)
app.use('/api/carrito', router_carrito)
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))