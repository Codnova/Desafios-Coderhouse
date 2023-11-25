console.log("Hola desde index.js")

const socket = io();

socket.on ("hello", (dataFromServer) => {
  alert(dataFromServer)
})