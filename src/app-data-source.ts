import { User } from "./entity/user.entity"
import { DataSource } from "typeorm"
import { AuctionItem } from "./entity/auctionItem.entity"
import { Bid } from "./entity/bid.entity"

export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: 3306,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Watcha49265",
    database: process.env.MYSQL_DATABASE || "oxbidKrub",
    entities: [Bid],
    logging: true,
    synchronize: true,
})