import express from "express";
//import data from "./data.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import path from "path";

dotenv.config();
const app = express();
const port = 4000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

await mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to data base");
  })
  .catch((error) => {
    console.log("error ", error);
  });

//***********************************************// */

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAPAL_CLIENT_ID || "sb");
});

//********************************************** */
app.use(express.static(path.join(__dirname, "front-end/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("server runs");
});

//AN express error handling for async requests for all routes
// got it from https://expressjs.com/en/guide/error-handling.html

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
//*****************************************// */

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
