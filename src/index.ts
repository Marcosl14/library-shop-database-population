import Faker from "faker";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Item } from "./entity/item.entity";

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new item into the database...");
    const item = new Item();
    item.title = "pepe";
    item.description = "pepe";
    item.photo = "pepe";
    item.price = 25.25;
    item.discount = 0;
    item.brand = "pepe";
    await connection.manager.save(item);
    console.log("Saved a new item with id: " + item.id);

    console.log("Loading items from the database...");
    const items = await connection.manager.find(Item);
    console.log("Loaded items: ", items);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));
