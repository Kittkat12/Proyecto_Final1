const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const habitsRouter = require("./routes/habits");
const cors = require("cors");
const userRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
const isProduction = process.env.NODE_ENV === "production";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/habits", habitsRouter);

app.get("/", (req, res) => {
  res.send("Servidor de hábitos funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});