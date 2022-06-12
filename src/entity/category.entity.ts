import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity({
  name: "categories",
})
export class Category {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: "bigint",
  })
  id: number;

  @Column({
    name: "name",
    type: "character varying",
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: "icon",
    type: "character varying",
    length: 1000,
    nullable: false,
  })
  icon: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
