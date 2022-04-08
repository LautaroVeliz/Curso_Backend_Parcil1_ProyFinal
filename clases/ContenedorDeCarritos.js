const Contenedor = require('./Contenedor');
const CarritoDeProductos = require('./CarritoDeProductos');
const fs = require('fs')

class ContenedorDeCarritos extends Contenedor {
    constructor(productos_path, carritos_path) {
        super(productos_path)
        this.carritos_path = carritos_path
        try {
            let contenido = fs.readFileSync(this.carritos_path, 'utf-8')
            let list_carritos = JSON.parse(contenido)
            list_carritos.forEach(carrito => {
                let new_carrito = new CarritoDeProductos(-1, this.productos_path)
                new_carrito.cargarData(carrito)
                this.objetos.push(new_carrito)
            });
        } catch (error) {
            console.log(error)
            console.log("Archivo no encontrado. Se creara uno para su conveniencia.");
            try {
                fs.writeFileSync(this.carritos_path, JSON.stringify(this.objetos))
                console.log("Archivo Creado")
            } catch (e) {
                console.log(error)
                console.log("Error al intentar crear el archivo: " + e)
            }
        }
    }

    addCarrito() {
        let new_id = (() => {
            let max_id = 0
            this.objetos.forEach(producto => {
                if (producto.id > max_id) max_id = producto.id
            });
            return max_id + 1
        })();
        let new_carrito = new CarritoDeProductos(new_id, this.productos_path)
        this.objetos.push(new_carrito)
        this.loggearCarritos()
        return new_id
    }

    loggearCarritos() {
        fs.writeFileSync(this.carritos_path, JSON.stringify(this.objetos))
    }
}
module.exports = ContenedorDeCarritos