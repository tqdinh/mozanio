import { CoffeeMenuItem } from '@path/core/domain/CoffeeMenuItem/CoffeeMenuItem';
import { CoffeeMenuItemRepository } from '@path/core/domain/CoffeeMenuItem/CoffeeMenuItemRepository';
export class CoffeeMenuItemRepositoryImpl implements CoffeeMenuItemRepository {
  getCoffeeMenuItem(): Promise<CoffeeMenuItem[]> {
    throw new Error('Method not implemented.');
  }
  getCoffeeItemDetail(id: String): Promise<CoffeeMenuItem> {
    throw new Error('Method not implemented.');
  }
}
