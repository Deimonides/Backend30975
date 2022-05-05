const fs = require('fs');
class Contenedor {

    constructor(archivo) {
        this.archivo = archivo;
    }
    
    async getAll() { 
        
        try {
            let archivo = this.archivo;
            let arrProductos = [];
            const strProductos = await fs.promises.readFile( archivo, 'utf-8' )
            //console.log(`getAll:contenido = `, contenido);
        }
        catch (error) {
            console.log(error.message)
        }
    } //listo
    
    async save(arrNuevoProducto){
        console.log(`Guardar producto: `, arrNuevoProducto);
        let archivo = this.archivo;
            //console.log(`save:archivo = `,archivo);
        let arrProductos = [];
        // conseguir id libre
        let strProductos = await fs.promises.readFile( archivo, 'utf-8' );
            //console.log(`strProductos leidos: `,strProductos);
        strProductos &&  (arrProductos = JSON.parse(strProductos))
            //console.log(`arrProductos leidos: `,arrProductos);
        
        let nuevoId = 1;
        arrProductos && (nuevoId = arrProductos.length + 1);
        //console.log(`nuevoId: `, nuevoId);
        
        arrNuevoProducto.id = nuevoId;
        //console.log(`arrNuevoProducto: `, arrNuevoProducto);
        arrProductos = arrProductos.concat(arrNuevoProducto)
        //console.log('*-*-*');
        strProductos = JSON.stringify(arrProductos, null, 2);
        console.log(`strProductos = `, strProductos);
        //console.log(`**nuevoId: `, nuevoId);
        
        // GRABAR TODOS LOS PRODUCTOS
        await fs.promises.writeFile(archivo, strProductos) 
       
       
        
        console.log(`El nuevo producto ${arrNuevoProducto.title} se grabó con el id `, nuevoId);       
        return nuevoId;
    }
    
    async getById(idNum){
        let archivo = this.archivo;
        let arrProductos = [];
        let strProductos = await fs.promises.readFile( archivo, 'utf-8' );
        arrProductos = JSON.parse(strProductos)
        console.log(`Mostrar el producto con ID:`,idNum);
        // array.find
    }
    
    deleteById(idNum){
        console.log(`Eliminar producto con ID:`, idNum);
        // array.filter
    }
    
    // VACIAR ARCHIVO
    deleteAll() {
        fs.writeFile ( archivo, "", err => {
            if (err) {
                console.error(err);
            } else {
                console.log('Se vació el archivo.');
            }
        
        })
    }

} // fin class Contenedor


console.clear();
console.log( "----------------------------------------------------------------" );
console.log( "-----------------------------INICIO-----------------------------" );
console.log( "----------------------------------------------------------------" );

// crear nuevo archivo
let dbProductos = new Contenedor ('./Productos.txt')
console.log( `+ Nuevo archivo creado: `, dbProductos );
//fs.writeFileSync( this.archivo, "NULL");

//console.log( "----------------------------------------------------------------" );
const producto1 = { 
    "title": "amd7",
    "price": 60000,
    "thumbnail": "https://i.postimg.cc/90wRTR3D/amd7.png"
}
//console.log(`producto1: `,producto1);
const producto2 = { 
    "title": "amd9",
    "price": 90000,
    "thumbnail": "https://i.postimg.cc/HjGJtYHB/amd9.png"
}
//console.log(`producto2: `,producto2);

//console.log( "----------------------------------------------------------------" );
//console.log( dbProductos.archivo )
//console.log( `Contenido del archivo: `, dbProductos.getAll( dbProductos.archivo ) );
dbProductos.save(producto1);

