const fs = require('fs')

class ProducManager {
    // Inicializo un array vacío:
    constructor(){
        this.products = []
        this.path = "./productos.txt"
    }

    // Utilizo la propiedad static para asignarle un id único a cada producto que se incorpore:
    static id = 0

    // Método para agregar nuevos productos:
    addProduct(title, description, price, image, code, stock){
        // Verificar que todos los campos estén definidos y no estén vacíos
        if (!title || !description || !price || !image || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        // Verifico que el código del producto no exista anteriormente antes de generar uno nuevo.
        if (this.products.some(producto => producto.code === code)){
            console.log(`El código ${code} ya existe, no se generó un nuevo producto`)
            return;
        }

        // Creo un objeto con los valores del producto.
        const newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ++ProducManager.id
        };

        // Añadir el producto si todos los campos están definidos y no están vacíos.
        this.products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    // Método para obtener todos los productos del array.
    getProduct(){
        let contenido = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return contenido
        
    }

    // Método para encontrar un ID dentro del array y poder visualizarlo.
    getProductById(id){
        let product = JSON.parse(fs.readFileSync(this.path, 'utf-8')).find(producto => producto.id === id);
        if (!product) {
            console.log("Not found");
        } else {
            console.log(product);
        }
    }
}

const productos = new ProducManager();



//TESTING

//Primera llamada = arreglo vacio
console.log(productos.getProduct());
console.log("--------fin primera llamada--------")

//Se agrega el primer producto
productos.addProduct('titulo1', 'descripcion 1', 1000, 'imagen 1', 'p001', 1);

//segunda llamada = arreglo con primer producto
console.log(productos.getProduct());
console.log("--------fin segunda llamada--------")

//Se agrega el segundo producto
productos.addProduct('titulo2', 'descripcion 2', 2000, 'imagen 2', 'p002', 2);

//tercera llamada = arreglo con primer y segundo producto
console.log(productos.getProduct());
console.log("--------fin tercera llamada--------")

//Se agrega tercer producto repitiendo el code del 2do producto repetido
productos.addProduct('titulo3', 'descripcion 3', 3000, 'imagen 3', 'p002', 2);

//cuarta llamada = arreglo con primer y segundo producto, el cual no se incorpora por estar repetido. 
console.log(productos.getProduct());
console.log("--------fin cuarta llamada--------")

//Se agrega tercer producto sin repetir el code
productos.addProduct('titulo3', 'descripcion 3', 3000, 'imagen 3', 'p003', 3);

//quinta llamada = arreglo con primer, segundo y tercer producto
console.log(productos.getProduct());
console.log("--------fin quinta llamada--------")

//Se agrega cuarto producto dejando un value sin definir (funciona dejando vacío el campo también). No se incorpora al tener undefined o '' en un value. 
productos.addProduct('titulo4', 'descripcion 4', 4000, 'imagen 4', 'p004' );

//sexta llamada = arreglo con los 4 productos 
console.log(productos.getProduct());
console.log("--------fin sexta llamada--------")

// Búsqueda de producto por ID (reemplazar el valor de búsqueda por el producto deseado. En caso de no existir, retorna producto inexistente)
productos.getProductById(1)

