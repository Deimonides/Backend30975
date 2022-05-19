const fs = require('fs');
class Contenedor {

    constructor(archivo) {
        this.archivo = './'+archivo;
    }
    
    async getAll() { 
        try {
            let archivo = this.archivo;
            const strProductos = await fs.promises.readFile( archivo, 'utf-8' )
            const arrProductos = JSON.parse(strProductos);
            return arrProductos
        }
        catch (error) {
            console.error(error.message)
        }
    }
    
    async getRandom() { 
        try {
            let archivo = this.archivo;
            const strProductos = await fs.promises.readFile( archivo, 'utf-8' )
            const arrProductos = JSON.parse(strProductos);
            const longitud = arrProductos.length
                //console.log(`longitud: `, longitud);
            const random = (Math.round( Math.random() * (longitud-1)))
                //console.log(`random: `, random);
            const prodRnd = arrProductos[random];
            return prodRnd
        }
        catch (error) {
            console.error(error.message)
        }
    }
    
    async save(arrNuevoProducto){
        let archivo = this.archivo;
        let strProductos;
        let arrProductos;
        try {
            strProductos = await fs.promises.readFile( archivo, 'utf-8' );
            arrProductos = JSON.parse(strProductos)
        } catch (e) {
            arrProductos = [];
        }
        let nuevoId = 1;
        arrProductos && (nuevoId = arrProductos.length + 1);
        arrNuevoProducto.id = nuevoId;
        arrProductos = arrProductos.concat(arrNuevoProducto)
        strProductos = JSON.stringify(arrProductos, null, 2);
        await fs.promises.writeFile(archivo, strProductos) 
        //return nuevoId;
        console.log(arrNuevoProducto);
        return arrNuevoProducto;
    }
    
    async getById(idNum){
        try {
            let archivo = this.archivo;
            let strProductos = await fs.promises.readFile( archivo, 'utf-8' );
            const arrProductos = JSON.parse(strProductos)
            let producto = arrProductos.find( item => item.id === idNum );
            if (producto) {
                return producto 
            } else {
                producto = { 'ERROR': 'producto no encontrado.' }
                return producto
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    
    async deleteById(idNum){
        let archivo = this.archivo;
        const strProductos = await fs.promises.readFile( archivo, 'utf-8' )
        const arrProductos = JSON.parse(strProductos);
        const existe = arrProductos.find(item => item.id === idNum)
        if (existe) {
            const arrFiltrado = arrProductos.filter(item => item.id != idNum)
            const strFiltrado = JSON.stringify(arrFiltrado, null, 2);
            await fs.promises.writeFile(archivo, strFiltrado);
        } else {
            console.log(`! Error: el producto con id ${idNum} no existe.`)
        }
    }
    
    async deleteAll() {
        fs.writeFile ( this.archivo, "", err => {
            if (err) {
                console.error(err);
            } else {
                console.log('>> Se vació el archivo.');
            }
        
        })
    }

} // fin class Contenedor

module.exports = Contenedor