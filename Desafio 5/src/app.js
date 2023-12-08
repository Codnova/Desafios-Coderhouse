// Imports

import express from 'express';
import {engine} from 'express-handlebars';
import {join} from 'path';
import {router as viewsRouter} from './routes/router.views.js';
import {router as productRouter} from './routes/routes.products.js';
import {router as cartRouter} from './routes/routes.carts.js';
import {Server} from 'socket.io';
import __dirname from './utils.js'; 
import mongoose from 'mongoose';


// Definitions

const PORT = 3000; 
const viewFolder = join(__dirname, '/views');
const publicFolder = join(__dirname, '/public');
const app = express();
const server = app.listen(PORT, ()=> console.log('Server online on Port: ', PORT));
export const io = new Server (server);

// Methods

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', viewFolder);
app.use(express.static(publicFolder));
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)


// Init

io.on('connection', socket => {
  console.log(`New socket connected with ID: ${socket.id}`)
})

try {
  await mongoose.connect('mongodb+srv://codiox:<INSERTECLAVE>@ecommerce.76nmmgq.mongodb.net/?retryWrites=true&w=majority', {dbName:'ecommerce'})
  console.log('DB Online')
  
} catch (error) {
  console.log(error)
}