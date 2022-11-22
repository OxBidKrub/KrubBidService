import express from "express";
import { myDataSource } from "../app-data-source";
import { Request, Response } from "express";
import { authenticateToken } from "../middleware/authorization";
import { Bid } from "../entity/bid.entity";
import { AuctionItem } from "../entity/auctionItem.entity";
var router = express.Router();

router.get(
  "/bids",
  authenticateToken,
  async function (req: Request, res: Response) {
    const bids = await myDataSource.getRepository(Bid).find();
    if (!bids) {
      return res.status(401).send("not found bids in database");
    }
    return res.status(200).json(bids);
  }
);

router.get(
  "/bids/:id",
  authenticateToken,
  async function (req: Request, res: Response) {
    const bids = await myDataSource.getRepository(Bid).findOneBy({
      id: req.params.id,
    });
    if (!bids) {
      return res.status(401).send("not found bid in database");
    }
    res.status(200).json(bids);
  }
);

router.post(
  "/bids",
  authenticateToken,
  async function (req: any, res: Response) {
    const auctionItem = await myDataSource
      .getRepository(AuctionItem)
      .findOneBy({
        id: req.body.auctionItemId,
      });
    console.log(auctionItem);
    if (!auctionItem) {
      return res.status(401).send("not found auction item in database");
    }
    /*const user = await myDataSource.getRepository(User).findOneBy({
          id: req.body.userId,
      })
      if(!user){
          return res.status(401).send("not found user in database");
      }*/
    
    if (auctionItem.minOffer + auctionItem.startingPrice <= req.body.Price) {
      const bid = await myDataSource
        .getRepository(Bid)
        .create({ ...req.body, userId: req.user.id });
      const result = await myDataSource.getRepository(Bid).save(bid);
      const updateAuctionItem = await myDataSource
        .getRepository(AuctionItem)
        .merge(auctionItem, {
          startingPrice: req.body.Price,
          WinnerId: req.user.id,
        });
      await myDataSource.getRepository(AuctionItem).save(updateAuctionItem);
      return res.status(200).json(result);
    } else {
      return res.status(402).send("Your bid price not enough");
    }
  }
);

router.put("/bids/:id", async function (req: Request, res: Response) {
  const bid = await myDataSource.getRepository(Bid).findOneBy({
    id: req.params.id,
  });
  if (!bid) {
    return res.status(401).send("not found bid in database");
  }

  const auctionItem = await myDataSource.getRepository(AuctionItem).findOneBy({
    id: req.body.auctionItemId,
  });
  if (auctionItem.minOffer + auctionItem.startingPrice <= req.body.Price) {
    const bid = await myDataSource.getRepository(Bid).findOneBy({
      id: req.params.id,
    });
    const updateAuctionItem = await myDataSource
      .getRepository(AuctionItem)
      .merge(auctionItem, { startingPrice: bid.Price, WinnerId: bid.userId });
    await myDataSource.getRepository(Bid).merge(bid, req.body);
    await myDataSource.getRepository(Bid).save(bid);
    await myDataSource.getRepository(AuctionItem).save(updateAuctionItem);
    return res.status(200).json(bid);
  } else {
    return res.status(402).send("Your bid price is not enough");
  }
});

router.delete("/bids/:id", async function (req: Request, res: Response) {
  const bid = await myDataSource.getRepository(Bid).findOneBy({
    id: req.params.id,
  });
  if (bid==null) {
    res.status(500).send("there no bid with the ID");
  } else {
    const results = await myDataSource.getRepository(Bid).delete(req.params.id);
    return res.status(200).send("delete successful");
  }
});

export = router;
