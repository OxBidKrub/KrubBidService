import { myDataSource } from "./app-data-source";
import express from "express";
import { Request, Response } from "express";
import { authenticateToken } from "./middleware/authorization";
import { Bid } from "./entity/bid.entity";
import { AuctionItem } from "./entity/auctionItem.entity";
import bidRoute from "./router/bid"
import auctionItemRoute from "./router/auctionItem"
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // start express server
    app.listen(PORT);
    console.log("server listening on PORT : " + PORT);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());
app.use(auctionItemRoute)
app.use(bidRoute);
// register routes


