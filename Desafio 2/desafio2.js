let fs = require ('fs')

class ProductManager {

  constructor(filePath){
    //this.products = [];
    this.path = filePath;
  }
  
  getProducts(){

    if(fs.existsSync(this.path)){
      return JSON.parse(fs.readFileSync(this.path, 'utf-8')) //Si el archivo existe, devuelvo el contenido
    } else{
      return [] //Sino existe, devuelvo un array vacio de productos
    }

  }
  
  addProduct(title, description, price, thumbnail, code, stock) {
    let products = this.getProducts()
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los valores son obligatorios');
      return;
    }

    let id=1
    if (products.length>0) {
      id = products[products.length-1].id + 1 
    }

    let newProduct = {
      id, title, description, price, thumbnail, code, stock
    }

    products.some(product => product.code === newProduct.code) ? console.log(`El código del producto ${newProduct.title} ya está en el arreglo`) : products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products))

  }

  getProductById(id){
    let products = this.getProducts()
    let productFound = products.find(product => product.id === id)
    if(!productFound) {
      throw new Error ('Product Not Found')
    }
    return productFound;
  }

  removeProduct(id){
    let products = this.getProducts()
    let index = products.findIndex(product => product.id === id);
    if (index === -1) {
      console.log("Producto no encontrado")
      return
    } else {
      console.log(`El producto ${products[index].title} ha sido borrado`)
      products.splice(index, 1)
      fs.writeFileSync(this.path, JSON.stringify(products, null, 5)) // Guardamos los cambios en el archivo
    }
  }

  updateProduct(id, object) {
    const allowedProperties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'] // Propiedades que están habilitadas para su modificación
    let products = this.getProducts()
    let index = products.findIndex(product => product.id === id);
    if (index === -1) {
      console.log("Producto no encontrado")
      return
    } else {
      for (let key of Object.keys(object)) {
        if (allowedProperties.includes(key)) {
            products[index][key] = object[key];
        }
    }
      
      fs.writeFileSync(this.path, JSON.stringify(products, null, 5)) // Guardamos los cambios en el archivo
    }
  }
  
}

//let productManager = new ProductManager('./data.json')


//productManager.addProduct('Xbox', 'console', 499, 'google.com', 1, 50);
//productManager.addProduct('PS5', 'console', 499, 'google.com', 2, 50);
//productManager.addProduct('Mouse', 'hardware', 499, 'google.com', 3, 50);
//productManager.addProduct('PC', 'hardware', 1000, 'google.com', 4, 50);

console.log("Los productos registrados son:", productManager.getProducts())
//console.log("El producto encontrado por ID es: ", productManager.getProductById(3))

//productManager.removeProduct(4)

//productManager.updateProduct(4, {title: 'PC nueva', price: 100, id: 9999})

console.log("Los productos luego del update son:", productManager.getProducts())


