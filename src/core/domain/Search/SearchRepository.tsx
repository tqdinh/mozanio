import { AnyAction } from 'redux';
import { CoffeeMenuItem } from '../CoffeeMenuItem/CoffeeMenuItem';
import { CoffeeStore } from '../CoffeeStore/CoffeeStore';

export interface SearchRepository {
  searchCafe(text: String): CoffeeMenuItem[];
  searchCoffeeStore(text: String): CoffeeStore[];
}
