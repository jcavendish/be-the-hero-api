const express = require("express");
const app = express();
const PORT = 3333;
const cors = require("cors");

const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log("Server up and running!")
})
