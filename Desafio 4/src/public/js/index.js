console.log("Hola desde index.js")

let socket = io();

socket.on ("newProduct", (dataFromServer) => {
  console.log("Console log desde cliente:", dataFromServer)
})


