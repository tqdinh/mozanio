import { LatLng } from 'react-native-maps';

export const MATCHING_PERCENT = 75;
export const SUPPORTED_BANK_URL =
  'https://sandbox.vnpayment.vn/qrpayauth/api/merchant/get_bank_list';
export const SUPPORTED_BANK_IMG = 'https://sandbox.vnpayment.vn/images/bank';

export const PAYMENT_METHOD_INVALID = -1;
export const PAYMENT_METHOD_CASH = 0;
export const PAYMENT_METHOD_I_BANKING = 2;
export const PAYMENT_METHOD_MOZANIO_WALLET = 4;
export const PAYMENT_METHOD_I_MASTER_VISA_JBC = 3;
export const PAYMENT_METHOD_ATM_CARD = 1;
export const distanceCalculate = (latLng1: LatLng, latLng2: LatLng) => {
  const R = 6371; // radius Earth

  const Phi1 = (latLng1.latitude * Math.PI) / 180;
  const Phi2 = (latLng2.latitude * Math.PI) / 180;

  const deltaPhi = (latLng2.latitude - latLng1.latitude) * (Math.PI / 180);
  const deltaLambda = (latLng2.longitude - latLng1.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(Phi1) *
      Math.cos(Phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
// static public String moneyFormat(int price){
//   DecimalFormat moneyFormat = new DecimalFormat("###,###,###");
//   return moneyFormat.format(price);
// }

export const PASSCODE_LENGTH = 6;
export const CREATE_PASSCODE_TRY_COUNT = 3;
