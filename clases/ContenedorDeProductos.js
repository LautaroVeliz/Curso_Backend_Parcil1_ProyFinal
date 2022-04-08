const Contenedor = require('./Contenedor');
const fs = require('fs')
const Producto = require('./Producto');

class ContenedorDeProductos extends Contenedor {
    constructor(productos_path) {
        super(productos_path)
        try {
            let contenido = fs.readFileSync(this.productos_path, 'utf-8')
            this.objetos = JSON.parse(contenido)
        } catch (error) {
            console.log(error)
            console.log("Archivo no encontrado. Se creara uno para su conveniencia.");
            try {
                fs.writeFileSync(this.productos_path, JSON.stringify(this.objetos))
                console.log("Archivo Creado")
            } catch (e) {
                console.log(error)
                console.log("Error al intentar crear el archivo: " + e)
            }
        }
    }

    addProducto(data) {
        if (this.isEqual(data)) return "Este producto ya existe"
        let new_id = (() => {
            let max_id = 0
            this.objetos.forEach(producto => {
                if (producto.id > max_id) max_id = producto.id
            });
            return max_id + 1
        })();
        let new_producto = new Producto(new_id)
        Producto.cargarData(new_producto, data)
        this.objetos.push(new_producto)
        fs.writeFileSync(this.productos_path, JSON.stringify(this.objetos))
        return "Producto agregado"
    }

    isEqual(data) {
        let list = this.objetos.filter((producto) => producto.nombre === data.nombre &&
            producto.descripcion === data.descripcion &&
            producto.codigo === data.codigo &&
            producto.foto_url === data.foto_url &&
            producto.precio === data.precio &&
            producto.stock === data.stock)
        if (list.length != 0) return true
        return false
    }

    updateById(id, new_data) {
        let respuesta = { error: 'producto no encontrado' }
        this.objetos.forEach(producto => {
            if (producto.id === id) {
                Producto.cargarData(producto, new_data)
                fs.writeFileSync(this.productos_path, JSON.stringify(this.objetos))
                respuesta = { success: 'producto modificado' }
            }
        });
        return respuesta
    }

    deleteById(id) {
        if (super.deleteById(id)) {
            fs.writeFileSync(this.productos_path, JSON.stringify(this.objetos))
            return "Objeto borrado"
        }
        return "Objeto no encontrado"
    }
}
module.exports = ContenedorDeProductos