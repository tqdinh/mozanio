import {
  PAYMENT_METHOD_ATM_CARD,
  PAYMENT_METHOD_I_MASTER_VISA_JBC,
} from '@path/constants/constant';

export const PaymentMenthods = [
  {
    id: 0,
    type: PAYMENT_METHOD_ATM_CARD,
    display_name: 'Thẻ ngân hàng nội địa',
    name: 'ATM Card',
    code: 'VNBANK',
    method: 'CARD_ATM',
    icon: 'note-text-outline',
    navigationName: 'SelectPaymentScreen',
    isActive: true,
  },
  {
    id: 1,
    type: PAYMENT_METHOD_I_MASTER_VISA_JBC,
    display_name: 'Thẻ ngân hàng quốc tế',
    name: 'International Card',
    code: 'INTCARD',
    method: 'CARD_INTER',
    icon: 'note-text-outline',
    navigationName: 'SelectPaymentScreen',
    isActive: true,
  },
];
