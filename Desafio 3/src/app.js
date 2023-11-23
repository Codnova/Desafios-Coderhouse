const ProductManager = require("./ProductManager");

async function main() {
  let productManager = new ProductManager("./dataAsync.json");

  const express = require("express");

  const PORT = 3000;

  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    //Para responder a los request en / (landing page)
    res.setHeader("Content-Type", "text/html");
    res.status(200).send("Página de Bienvenida");
  });

  app.get("/productos", async (req, res) => {
    //Devuelve la lista completa de productos
    res.setHeader("Content-Type", "application/json"); //Seteamos el header
    let productos = await productManager.getProducts();
    let limit = parseInt(req.query.limit); //Obtenemos el query del limite de productos
    if (!limit) {
      res.status(200).send({ productos });
    } else {
      productos = productos.slice(0, limit); //Modificamos el array para limitar los resultados
      res.status(200).send({ productos });
    }
    console.log(productos);
  });

  app.get("/productos/:id", async (req, res) => {
    //Devuelve un producto por su ID
    res.setHeader("Content-Type", "application/json"); //Seteamos el header
    let id = req.params.id; //Este param viene en formato string
    id = parseInt(id); //Transformamos el ID de string a numero
    if (isNaN(id)) {
      return res.status(404).send("el ID ingresado no es un numero");
    }
    resultado = await productManager.getProductById(id);
    console.log(resultado);
    if (!resultado) {
      res.status(404).send("No se encontró el producto");
    } else {
      res.status(200).json({ resultado });
    }
  });

  const server = app.listen(PORT, () => {
    console.log(`Server online en puerto ${PORT}`);
  });
}

main();
