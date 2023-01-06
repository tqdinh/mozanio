import { Order } from '@path/core/domain/Order/Order';
import { OrderRepository } from '@path/core/domain/Order/OrderRepository';

export class OrderRepositoryImpl implements OrderRepository {
  cancelOrder(orderId: String) {
    throw new Error('Method not implemented.');
  }
  getOrderStatus(orderId: String) {
    throw new Error('Method not implemented.');
  }

  placeOrder(order: Order) {
    throw new Error('Method not implemented.');
  }
}
