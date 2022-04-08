const Contenedor = require('./Contenedor');
const fs = require('fs')

class CarritoDeProductos extends Contenedor {
    constructor(id, productos_path) {
        super(productos_path)
        this.id = id
        this.timestamp = Date.now()
    }

    addProducto(id) {
        let respuesta = { error: 'Producto no encontrado' }
        let productos_list = []
        try {
            let contenido = fs.readFileSync(this.productos_path, 'utf-8')
            productos_list = JSON.parse(contenido)
        } catch (error) {
            console.log(error)
            console.log("Archivo no encontrado.");
            return "Archivo no encontrado"
        }
        productos_list.forEach(producto => {
            if (producto.id === id) {
                this.objetos.push(producto)
                respuesta = { success: 'Producto encontrado' }
            }
        });
        return respuesta
    }

    deleteAll() {
        while (this.objetos.length > 0) this.objetos.pop()
    }

    deleteById(id) {
        if (super.deleteById(id)) {
            return "Objeto borrado"
        }
        return "Objeto no encontrado"
    }

    cargarData(carrito) {
        this.id = carrito.id
        this.timestamp = carrito.timestamp
        this.objetos = carrito.objetos
    }
}

module.exports = CarritoDeProductos