const socket = io("http://localhost:8000");

const form = document.getElementById("form");
const msgInput = document.getElementById("inputMessage");
const msgContainer = document.querySelector(".container");

const appendMsg = (message, position) => {
  const newDiv = document.createElement("div");
  newDiv.innerText = message;
  newDiv.classList.add("message");
  newDiv.classList.add(position);
  msgContainer.append(newDiv);
};

const name = prompt("Enter your name to join.");
console.log(name);
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  appendMsg(`${name} joined the chat!`, "left");
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInput.value;
  socket.emit("send", message);
  appendMsg(message, "right");
  form.reset();
  console.log(message);
});
socket.on("receive", (data) => {
  appendMsg(`${data.name}: ${data.message}`, "left");
});
socket.on("leave", (name) => {
  appendMsg(`${name} left the chat.`, "left");
});
