import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterLoad,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Item } from "./item.entity";
import { OfferItem } from "./offer-item";

@Entity("offers")
export class Offer {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: "bigint",
  })
  id: number;

  @Column({
    name: "title",
    type: "character varying",
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    name: "description",
    type: "character varying",
    length: 1000,
    nullable: true,
  })
  description?: string;

  @Column({
    name: "photo",
    type: "character varying",
    length: 1000,
    nullable: true,
  })
  photo?: string;

  @Column({
    name: "price",
    type: "decimal",
    precision: 13,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: "discount",
    type: "decimal",
    precision: 13,
    scale: 2,
    nullable: true,
    default: 0,
  })
  discount?: number;

  priceWithDiscount: number;

  @ManyToMany((type) => OfferItem, (offerItem) => offerItem.offers, {
    eager: true,
  })
  @JoinTable({ name: "offers_offer_items" })
  offerItems: OfferItem[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: null,
    select: false,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: null,
    select: false,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamptz",
    default: null,
    select: false,
  })
  deletedAt?: Date;

  @AfterLoad()
  getpriceWithDiscount() {
    this.priceWithDiscount = parseFloat(
      (this.price * (1 - this.discount / 100)).toFixed(2)
    );
  }

  @AfterLoad()
  converttoNumbers() {
    this.price = parseFloat(this.price.toString());
    this.discount = parseFloat(this.discount.toString());
  }

  @BeforeInsert()
  async lowerCaseAtributes() {
    this.title = this.title ? this.title.toLowerCase() : this.title;
  }
}
