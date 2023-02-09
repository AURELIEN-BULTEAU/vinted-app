require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
const listOfferRoutes = require("./routes/list-offer");
const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

app.use(userRoutes);
app.use(offerRoutes);
app.use(listOfferRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "route get" });
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});
app.listen(process.env.PORT, () => {});
