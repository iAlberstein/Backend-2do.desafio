class ProducManager {
    //inicializo un array vacío:
    constructor(){
        this.products = []
    }

    //Utilizo la propiedad static para asignarle un id unico a cada producto que se incorpore:
    static id = 0


    //Método para agregar nuevos productos:
    addProduct(title, description, price, image, code, stock){

        //Verifico que el codigo de producto exista anteriormente.
        for(let i = 0; i < this.products.length; i++){
            if (this.products[i].code === code){
                console.log(`El código ${code} ya existe, no se generó un nuevo producto`)
                return
            }
        }    

        //Creo un objeto con los value del producto. 
        const newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
        }

        //Verifico que los value ingresados en un nuevo producto no sean undefined o estén vacios antes de crear un nuevo producto.
        if(Object.values(newProduct).every(value => value !== undefined && value !== '')) {
            ProducManager.id++;
            this.products.push({
                ...newProduct, 
                id: ProducManager.id
            });
        } else {
            console.log("Se dejó un campo sin definir o vacío. Todos son requisitos obligatorios.");
        }      
    }

    //Método para obtener todos los productos del array.
    getProduct(){
        return this.products;
    }

    //Método para verificar si existe un ID determinado de producto.
    existe(id) {
        return this.products.find((producto) => producto.id === id);
    }

    //Método para encontrar un ID dentro del array y poder visualizarlo.
    getProductById(id){
        !this.existe(id) ? console.log("Not found") : console.log(this.existe(id)); 
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