import { myDataSource } from "./app-data-source";
import express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "./middleware/authorization";
import { getAllUsers, getUserbyId, pay, topup } from "./repo/userRepo";
import { AuctionItem } from "./entity/auctionItem.entity";
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
let router = express.Router();
app.use('', router);
// register routes
router.get("/auction-items",authenticateToken, async function (req: Request, res: Response) {
  const auctionItems = await myDataSource.getRepository(AuctionItem).find()
  if(!auctionItems){
      return res.status(401).send("not found auctionItems in database");
  }
  return res.status(200).json(auctionItems);
})

router.get("/auction-items/:id",authenticateToken, async function (req: Request, res: Response) {
  const auctionItem = await myDataSource.getRepository(AuctionItem).findOneBy({
      id: req.params.id,
  })
  if(!auctionItem){
      return res.status(401).send("not found auctionItem in database");
  }
  res.status(200).json(auctionItem)
})

router.post("/auction-items",authenticateToken, async function (req: any, res: Response) {
  const existingUser = req.user
  if(!existingUser){
      return res.status(401).send("not found user in database");
  }
  const auctionItem = await myDataSource.getRepository(AuctionItem).create({...req.body,
  userId: req.user.id});
  const results = await myDataSource.getRepository(AuctionItem).save(auctionItem)
  return res.status(200).json(results)
})

router.put("/auction-items/:id", async function (req: Request, res: Response) {
  const auctionItem = await myDataSource.getRepository(AuctionItem).findOneBy({
      id: req.params.id,
  })
  if(!auctionItem){
      return res.status(401).send("not found auctionItem in database");
  }
  myDataSource.getRepository(AuctionItem).merge(auctionItem, req.body)
  const results = await myDataSource.getRepository(AuctionItem).save(auctionItem)
  return res.status(200).json(results)
})

router.delete("/auction-items/:id", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(AuctionItem).delete(req.params.id)
  return res.status(200).send("delete successful")
})

