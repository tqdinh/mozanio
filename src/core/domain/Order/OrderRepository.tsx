import { Order } from './Order';

export interface OrderRepository {
  placeOrder(order: Order): any;
  cancelOrder(orderId: String): any;
  getOrderStatus(orderId: String): any;
}
