class Contenedor {
    constructor(productos_path) {
        this.objetos = []
        this.productos_path = productos_path
    }

    getAll() {
        return this.objetos;
    }

    getById(id) {
        let objeto = "ID invalido"
        this.objetos.forEach(producto => {
            if (producto.id === id) {
                objeto = producto
            }
        });
        return objeto
    }

    deleteById(id) {
        let leng_origin = this.objetos.length;
        this.objetos = this.objetos.filter((producto) => producto.id !== id)
        if (this.objetos.length == leng_origin) return false
        return true
    }
}
module.exports = Contenedor