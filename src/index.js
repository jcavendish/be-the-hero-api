const express = require("express");
const { errors } = require('celebrate');

const cors = require("cors");

const app = express();
const PORT = 3333;

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(PORT, () => {
  console.log("Server up and running!")
})
