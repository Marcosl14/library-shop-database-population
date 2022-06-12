import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Item } from "../entity/item.entity";
import { Category } from "../entity/category.entity";
import { Offer } from "../entity/offers.entity";
import { OfferItem } from "../entity/offer-item";

export default class CreateItems implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const categories = await factory(Category)().createMany(20);

    const items = await factory(Item)()
      .map(async (item) => {
        item.category =
          categories[Math.floor(Math.random() * categories.length)];
        return item;
      })
      .createMany(2000);

    const offerItems = await factory(OfferItem)()
      .map(async (offerItem) => {
        while (true) {
          const index = Math.floor(Math.random() * items.length);
          if (items[index].deletedAt == null) {
            offerItem.item = items[index];
            return offerItem;
          }
        }
      })
      .createMany(200);

    const offers = await factory(Offer)()
      .map(async (offer) => {
        offer.offerItems = [];
        for (let index = 0; index < Math.random() * 20; index++) {
          const offerItem =
            offerItems[Math.floor(Math.random() * offerItems.length)];
          if (
            !offer.offerItems
              .map((offerItem) => offerItem.id)
              .includes(offerItem.id)
          ) {
            offer.offerItems.push(offerItem);
          }
        }
        return offer;
      })
      .createMany(30);
  }
}
