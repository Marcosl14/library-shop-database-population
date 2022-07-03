import { define } from "typeorm-seeding";
import Faker from "faker";
import { Offer } from "../entity/offers.entity";

define(Offer, (faker: typeof Faker) => {
  let item = new Offer();

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
    max: 100,
    precision: 5,
  });

  return item;
});
