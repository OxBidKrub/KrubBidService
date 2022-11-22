import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { IsNotEmpty, IsString, IsNumber, IsDate, IsUUID, UUIDVersion } from 'class-validator';
import { Base } from "./base/Base.entity";


@Entity('bid')
export class Bid extends Base{

    @Column()
    @IsNumber()
    @IsNotEmpty()
    Price: number

    @CreateDateColumn()
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


