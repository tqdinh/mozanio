import {
  AddItemCartRepository,
  ItemCartManagementRepository,
} from '@path/core/domain/AddItemCart/ItemCartManagementRepository';
import { ItemCart } from '@path/core/domain/AddItemCart/ItemCart';

export class ItemCartManagementRepositoryImpl
  implements ItemCartManagementRepository
{
  addItemToCart(item: ItemCart) {
    throw new Error('Method not implemented.');
  }
  removeItemToCart(item: ItemCart) {
    throw new Error('Method not implemented.');
  }
  getListItemOnCart(): ItemCart[] {
    throw new Error('Method not implemented.');
  }
  cleanItemsOnCart() {
    throw new Error('Method not implemented.');
  }
}
