const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const habitsRouter = require("./routes/habits");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/habits", habitsRouter);

app.get("/", (req, res) => {
  res.send("Servidor de hábitos funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});