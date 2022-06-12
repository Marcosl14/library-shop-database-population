import { define } from "typeorm-seeding";
import Faker from "faker";
import { Category } from "../entity/category.entity";

define(Category, (faker: typeof Faker) => {
  let category = new Category();

  category.name = faker.lorem.word(50);
  category.icon = `https://source.unsplash.com/random/200x200?sig=${faker.random.number(
    {
      min: 1,
      max: 200,
      precision: 1,
    }
  )}`;

  return category;
});
