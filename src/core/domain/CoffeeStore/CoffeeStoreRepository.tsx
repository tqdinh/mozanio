import { CoffeeStore } from './CoffeeStore';
export interface CoffeeStoreRepository {
  getCoffeeStore(): Promise<CoffeeStore[]>;
  getCoffeeStoreDetail(id: String): Promise<CoffeeStore>;
}
