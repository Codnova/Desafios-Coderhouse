
class ProductManager {

  constructor(){
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los valores son obligatorios');
      return;
    }

    let id=1
    if (this.products.length>0) {
      id = this.products[this.products.length-1].id + 1 
    }

    let newProduct = {
      id, title, description, price, thumbnail, code, stock
    }

    this.products.some(product => product.code === newProduct.code) ? console.log(`El producto ${newProduct.title} ya está en el arreglo`) : this.products.push(newProduct);

  }

  getProducts(){
    return this.products
  }

  getProductById(id){
    let productFound = this.products.find(product => product.id === id)
    if(!productFound) {
      throw new Error ('Product Not Found')
    }
    return productFound;
  }
}

let productManager = new ProductManager()

productManager.addProduct('Xbox', 'console', 499, 'google.com', 1, 50);
productManager.addProduct('PS5', 'console', 499, 'google.com', 2, 50);
productManager.addProduct('Xbox', 'console', 499, 'google.com', 1, 50);
productManager.addProduct('PC', 'computer', 4299, 'google.com', 3, 50);
productManager.addProduct('Mouse', 'computer', 99, 'google.com', 4, 50);

console.log(productManager.getProductById(4))
