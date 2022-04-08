const express = require("express")
const ContenedorDeCarritos = require("../clases/ContenedorDeCarritos")
const router_carrito = express.Router()

router_carrito.use(express.urlencoded({ extended: true }))
router_carrito.use(express.json())

const carritos = new ContenedorDeCarritos('./productos.txt', './carritos.txt')

router_carrito.get('/:id/productos', (req, res) => {
    let carrito = carritos.getById(parseInt(req.params.id))
    if (carrito === "ID invalido") {
        res.json({ error: "ID invalido de carrito" })
        return
    }
    res.json(carrito.getAll())
})

router_carrito.post('/', (req, res) => {
    let new_id = carritos.addCarrito()
    res.json({ Nuevo_carrito_ID: new_id })
})

router_carrito.post('/:id/productos', (req, res) => {
    let carrito = carritos.getById(parseInt(req.params.id))
    if (carrito === "ID invalido") {
        res.json({ error: "ID invalido de carrito" })
        return
    }
    let respuesta = carrito.addProducto(parseInt(req.body.idProducto))
    carritos.loggearCarritos()
    res.json(respuesta)
})

router_carrito.delete('/:id', (req, res) => {
    let carrito = carritos.getById(parseInt(req.params.id))
    if (carrito === "ID invalido") {
        res.json({ error: "ID invalido de carrito" })
        return
    }
    carrito.deleteAll()
    carritos.deleteById(parseInt(req.params.id))
    carritos.loggearCarritos()
    res.json({ ID_Carrito_Eliminado: req.params.id })
})

router_carrito.delete('/:id/productos/:id_prod', (req, res) => {
    let carrito = carritos.getById(parseInt(req.params.id))
    if (carrito === "ID invalido") {
        res.json({ error: "ID invalido de carrito" })
        return
    }
    let respuesta = carrito.deleteById(parseInt(req.params.id_prod))
    carritos.loggearCarritos()
    res.json(respuesta)
})

module.exports = router_carrito