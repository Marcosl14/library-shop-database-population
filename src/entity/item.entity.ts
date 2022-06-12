import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { OfferItem } from "./offer-item";

@Entity({
  name: "items",
})
export class Item {
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
    type: "float",
    nullable: false,
  })
  price: number;

  @Column({
    name: "discount",
    type: "int",
    nullable: true,
    default: null,
  })
  discount?: number;

  @Column({
    name: "brand",
    type: "character varying",
    length: 30,
    nullable: true,
  })
  brand?: string;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => OfferItem, (offerItem) => offerItem.item)
  offerItem: OfferItem[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: null,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: null,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamptz",
    default: null,
  })
  deletedAt?: Date;
}
