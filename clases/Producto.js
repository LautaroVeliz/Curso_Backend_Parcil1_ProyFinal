class Producto {
    constructor(id) {
        this.id = id
        this.timestamp = Date.now()
        this.nombre = ""
        this.descripcion = ""
        this.codigo = ""
        this.foto_url = ""
        this.precio = 0
        this.stock = 0
    }

    static cargarData(producto, data) {
        producto.nombre = data.nombre
        producto.descripcion = data.descripcion
        producto.codigo = data.codigo
        producto.foto_url = data.foto_url
        producto.precio = data.precio
        producto.stock = data.stock
    }
}
module.exports = Producto