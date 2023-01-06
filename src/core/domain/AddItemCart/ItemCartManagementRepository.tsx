import { ItemCart } from './ItemCart';

export interface ItemCartManagementRepository {
  addItemToCart(item: ItemCart): any;
  removeItemToCart(item: ItemCart): any;
  getListItemOnCart(): ItemCart[];
  cleanItemsOnCart(): any;
}
