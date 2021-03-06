import { define } from "typeorm-seeding";
import Faker from "faker";
import { Item } from "../entity/item.entity";

define(Item, (faker: typeof Faker) => {
  let item = new Item();

  item.title = faker.commerce.productName();
  item.description = faker.commerce.productName();
  item.photo = `https://source.unsplash.com/random/200x200?sig=${faker.random.number(
    {
      min: 1,
      max: 200,
      precision: 1,
    }
  )}`;
  item.price = faker.random.number({
    min: 0.01,
    max: 10000,
    precision: 0.01,
  });
  item.discount = faker.random.number({
    min: 0,
    max: 75,
    precision: 5,
  });
  item.brand = faker.lorem.word(50);
  item.deletedAt = Math.random() < 0.2 ? faker.date.past() : null;

  return item;
});
