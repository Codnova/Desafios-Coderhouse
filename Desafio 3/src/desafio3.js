let fs = require ('fs').promises

class ProductManager {

  constructor(filePath){
    //this.products = [];
    this.path = filePath;
  }

  async getProducts() {
    try {
      let data = await fs.readFile(this.path, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        //Archivo no existe
        return []
      } 
      throw error
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock){
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los valores son obligatorios');
        return;
      }
      let products = await this.getProducts()
      let id=1
      if (products.length>0) {
        id = products[products.length-1].id + 1 
      }
      let newProduct = {
        id, title, description, price, thumbnail, code, stock
      }
      products.some(product => product.code === newProduct.code) ? console.log(`El código del producto ${newProduct.title} ya está en el arreglo`) : products.push(newProduct);
      await fs.writeFile(this.path, JSON.stringify(products))

    } catch(error) {
      console.error('Error agregando el producto: ', error.message)
    }
  }

  async getProductById(id) {
    try {
      let products = await this.getProducts()
      let productFound = products.find(product => product.id === id)
      if(!productFound) {
        console.log('No se encontró el producto con ID: ', id)
      }
      return productFound; //Retornamos el producto encontrado

    } catch (error) {
      console.error('Error obteniendo el producto con ID: ', id)
      throw error
    }
  }

  async removeProduct(id){
    try {
      let products = await this.getProducts()
      let index = products.findIndex(product => product.id === id);
      if (index === -1) {
        console.log("Producto no encontrado en removeProduct")
        return
      } else {
        console.log(`El producto ${products[index].title} ha sido borrado`)
        products.splice(index, 1)
        await fs.writeFile(this.path, JSON.stringify(products, null, 5)) //Guardamos los cambios en el archivo
      }
    } catch (error) {
      console.error('Error borrando el producto con ID: ', id)
      throw error
    }
  }

  async updateProduct(id, object) {
    try {
      const allowedProperties = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'] //Propiedades que están habilitadas para su modificación
      let products = await this.getProducts()
      let index = products.findIndex(product => product.id === id);
      if (index === -1) {
        console.log("Producto no encontrado en updateProduct")
        return
      } else {
        console.log(`El producto ${products[index].title} ha sido actualizado`)
        for (let key of Object.keys(object)) { //Si las propiedades del objeto a actualizar están en la lista, los valores se reemplazan
          if (allowedProperties.includes(key)) {
              products[index][key] = object[key];
          }
      }
        await fs.writeFile(this.path, JSON.stringify(products, null, 5)) //Guardamos los cambios en el archivo
      }
    } catch(error){
        console.error('No se actualizó el producto con ID: ', id)
        throw error
    }
  }

}

async function main(){

  let productManager = new ProductManager('./dataAsync.json');
  
  const express = require ('express')
  
  const PORT=3000
  
  const app = express()

  app.use(express.urlencoded({extended:true}))
  
  app.get('/', (req, res)=>{ //Para responder a los request en / (landing page)
    res.setHeader('Content-Type', 'text/html')
    res.send("Página de Bienvenida")
    
  })
  
  app.get('/productos', async (req, res)=>{ //Devuelve la lista completa de productos
    res.setHeader('Content-Type', 'application/json') //Seteamos el header
    let productos = await productManager.getProducts()
    let limit = parseInt(req.query.limit) //Obtenemos el query del limite de productos
    productos = productos.slice(0, limit) //Modificamos el array para limitar los resultados
    res.send({productos})
    console.log(productos)
  })

  app.get('/productos/:id', async (req, res)=>{ //Devuelve un producto por su ID
    res.setHeader('Content-Type', 'application/json') //Seteamos el header
    let productos = await productManager.getProducts()
    let id= req.params.id //Este param viene en formato string
    id = parseInt(id) //Transformamos el ID de string a numero
    if(isNaN(id)){
      return res.send('el ID ingresado no es un numero')
    }
    resultado = await productManager.getProductById(id)
    console.log(resultado)
    if(!resultado) {
      res.send("No se encontró el producto")
    } else{
      res.status(200).json({resultado})
    }
  })
  
  const server = app.listen(PORT, ()=>{
    console.log(`Server online en puerto ${PORT}`)
  } )
}

main()