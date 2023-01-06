export interface ItemHistoryPayment {
  id: number;
  payment_method: any;
  payment_type: any;
  status: any;
  payment_info: string;
  refund_requested_time: Date | null;
  payment_completed_time: Date | null;
  amount: number;
  payment_code: any;
  payment_gateway: string;
  transaction_id: number;
  transaction_status: string;
  refund_transaction_id: number;
  customer: string;
  currency: number;
  updated_time: Date | null;
  created_time: Date | null;
  target_type: {
    id: number;
    model: string;
  };
  target_id: number;
}
export interface ListHistoryPaymentModal {
  count: number;
  next: string;
  previous: string;
  results: Array<ItemHistoryPayment>;
}
