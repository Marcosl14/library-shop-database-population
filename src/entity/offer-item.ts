import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Item } from "./item.entity";
import { Offer } from "./offers.entity";

@Entity("offer_items")
export class OfferItem {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: "bigint",
  })
  id: number;

  @ManyToMany((type) => Offer, (offer) => offer.offerItems, { eager: false })
  offers: Offer[];

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: "item_id" })
  item: Item;

  @Column({
    name: "quantity",
    type: "integer",
    nullable: false,
    default: 1,
  })
  quantity: number;
}
