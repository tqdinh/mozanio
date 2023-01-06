import { CoffeeStore } from '../../domain/CoffeeStore/CoffeeStore';
import { CoffeeStoreRepository } from '../../domain/CoffeeStore/CoffeeStoreRepository';
export class CoffeeStoreRepositoryImpl implements CoffeeStoreRepository {
  getCoffeeStore(): Promise<CoffeeStore[]> {
    throw new Error('Method not implemented.');
  }
  getCoffeeStoreDetail(id: String): Promise<CoffeeStore> {
    throw new Error('Method not implemented.');
  }
}
