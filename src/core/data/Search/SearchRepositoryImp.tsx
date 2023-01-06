import { CoffeeMenuItem } from '@path/core/domain/CoffeeMenuItem/CoffeeMenuItem';
import { CoffeeStore } from '@path/core/domain/CoffeeStore/CoffeeStore';
import { SearchRepository } from '@path/core/domain/Search/SearchRepository';

export class SearchRepositoryImp implements SearchRepository {
  searchCafe(text: String): CoffeeMenuItem[] {
    throw new Error('Method not implemented.');
  }
  searchCoffeeStore(text: String): CoffeeStore[] {
    throw new Error('Method not implemented.');
  }
}
