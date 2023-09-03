import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/books-router.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
/* app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "POST"],
    allowedHeaders: ["Content-Type"],
  })
); */

app.use("/books", booksRouter);

app.get("/", (request, response) => {
  console.log(request);
  response.status(234).send("Welcome to MERN stack");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to the DB successfully");
    app.listen(PORT, () => {
      console.log(`App is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
