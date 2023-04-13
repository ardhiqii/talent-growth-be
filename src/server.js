const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const mongooURL =
  "mongodb+srv://ardhiqi:123@cluster0.mucreal.mongodb.net/talent-growth?retryWrites=true&w=majority";
mongoose.connect(mongooURL);
const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
db.once("connected", () => {
  console.log("Database connected ");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
