import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { IsNotEmpty, IsString, IsNumber, IsDate, IsUUID, UUIDVersion } from 'class-validator';
import { Base } from "./base/Base.entity";


@Entity('bid')
export class Bid extends Base{

    @Column()
    @IsNumber()
    @IsNotEmpty()
    Price: number

    @Column()
    @IsDate()
    @IsNotEmpty()
    time: Date

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    auctionItemId: string;
  
    
}


