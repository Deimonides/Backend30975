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
    
    async save(arrNuevoProducto){
        let archivo = this.archivo;
        let arrProductos = [];
        let strProductos = await fs.promises.readFile( archivo, 'utf-8' );
        strProductos &&  (arrProductos = JSON.parse(strProductos))
        let nuevoId = 1;
        arrProductos && (nuevoId = arrProductos.length + 1);
        arrNuevoProducto.id = nuevoId;
        arrProductos = arrProductos.concat(arrNuevoProducto)
        strProductos = JSON.stringify(arrProductos, null, 2);
        
        // GRABAR TODOS LOS PRODUCTOS
        await fs.promises.writeFile(archivo, strProductos) 
        console.log(`El nuevo producto ${arrNuevoProducto.title} se grabó con el id `, nuevoId);       
        return nuevoId;
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
                producto = '! Error: producto no encontrado'
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
    
    // VACIAR ARCHIVO
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


console.clear();
console.log( "------------------------------------------------" );
console.log( "---------------------INICIO---------------------" );
console.log( "------------------------------------------------" );

;(async () => {
    const dbProductos = new Contenedor('Productos.txt')
    
    /*const producto = {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://escuadra.jpg'
    }*/
    
    /* const producto = {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://calculadora.jpg'
    } */
    
    const producto = {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://globoterr.jpg'
    }
   
    await dbProductos.save(producto);
  
    const productoId = await dbProductos.getById(4);
    console.log(`>> Mostrar producto específico: `,productoId);
  
  
    const todosLosProductos = await dbProductos.getAll();
    console.log(`>> Listar todos los productos: `,todosLosProductos);
  
    await dbProductos.deleteById(5);
  
    //await dbProductos.deleteAll();
})()