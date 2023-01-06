import { CoffeeMenuItem } from './CoffeeMenuItem';

export interface CoffeeMenuItemRepository {
  getCoffeeMenuItem(): Promise<CoffeeMenuItem[]>;
  getCoffeeItem(id: String): Promise<CoffeeMenuItem>;
}
