import { define } from "typeorm-seeding";
import Faker from "faker";
import { OfferItem } from "../entity/offer-item";

define(OfferItem, (faker: typeof Faker) => {
  let offerItem = new OfferItem();

  offerItem.quantity = faker.random.number({
    min: 1,
    max: 10,
    precision: 1,
  });

  return offerItem;
});
