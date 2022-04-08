const express = require("express")
const ContenedorDeProductos = require("../clases/ContenedorDeProductos")
const router_productos = express.Router()

router_productos.use(express.urlencoded({ extended: true }))
router_productos.use(express.json())

const contenedor = new ContenedorDeProductos('./productos.txt')

let admin = true;

router_productos.get('/', (req, res) => {
    res.json(contenedor.getAll())
})

router_productos.get('/:id', (req, res) => {
    res.json(contenedor.getById(parseInt(req.params.id)))
})

router_productos.post('/', (req, res) => {
    if (!admin) {
        res.json({
            error: -1,
            descripcion: "ruta '/' método 'POST' no autorizada"
        })
        return
    }
    contenedor.addProducto(req.body)
    res.redirect('/api/productos')
})

router_productos.put('/:id', (req, res) => {
    if (!admin) {
        res.json({
            error: -1,
            descripcion: "ruta '/:id' método 'PUT' no autorizada"
        })
        return
    }
    res.json(contenedor.updateById(parseInt(req.params.id), req.body))
})

router_productos.delete('/:id', (req, res) => {
    if (!admin) {
        res.json({
            error: -1,
            descripcion: "ruta '/:id' método 'DELETE' no autorizada"
        })
        return
    }
    res.json(contenedor.deleteById(parseInt(req.params.id)))
})

module.exports = router_productos