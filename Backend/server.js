import express from "express";
import dotenv from "dotenv";
dotenv.config();

import urlRouter from "./routes/url.routes.js";
import connectDB from "./initDB/index.js";
import cors from 'cors'
const app = express();
const port = process.env.PORT || 8080;

await connectDB();
app.use(cors())
app.use(express.json());

app.use("/", urlRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
