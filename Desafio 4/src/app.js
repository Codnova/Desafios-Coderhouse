// Imports

import express from 'express';
import {router as routerProducts} from './routes/routes.products.js'
import {router as routerCarts} from './routes/routes.carts.js'
import {engine} from "express-handlebars";
import {router as viewsRouter} from "./routes/routes.views.js"
import {join} from "path"; 
import {Server} from "socket.io";
import __dirname from "./utils.js"; 


//Definitions

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=> console.log('Escuchando en puerto: ', PORT));
const fileViews = join(__dirname, "./views");
const socketServer = new Server (server);
const publicFolder = join(__dirname, "/public");

//Methods

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", fileViews);
app.use(express.static(publicFolder))

app.use("/", viewsRouter);

socketServer.on("connection", socket => {
  console.log(`Nuevo cliente conectado con ID: ${socket.id}`)
  const message = "Mensaje para el cliente desde el servidor"
  socket.emit("hello", message)
})


/* app.get("/", (req, res) => { //Homepage
  res.setHeader("Content-Type", "text/plain"); //Seteamos el header
  res.status(200).send('OK');
  
}); */

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)

