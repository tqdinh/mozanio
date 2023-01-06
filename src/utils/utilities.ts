import { storage } from '@path/App';
import { MATCHING_PERCENT } from '@path/constants/constant';
import { baseURL } from '@path/redux/Apis/api';
import Upload, { MultipartUploadOptions } from 'react-native-background-upload';
export const formatVND = (money: number) => {
  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 9,
  };
  return new Intl.NumberFormat('vi-VN', config).format(money);
};
export const formatTime = (time: Date) =>
  new Date(time).toLocaleTimeString('vi-VN', {
    hour: 'numeric',
    minute: 'numeric',
  });

//format day
export const formatDay = (date: Date) => new Date(date).toLocaleDateString();
//convertToNiceDate
export const convertToNiceDate = (time: string) => {
  var date = new Date(time),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    daydiff = Math.floor(diff / 86400);
  return (
    (daydiff == 0 &&
      ((diff < 60 && 'Gần đây') ||
        (diff < 120 && '1 phút trước') ||
        (diff < 3600 && Math.floor(diff / 60) + ' phút trước') ||
        (diff < 7200 && '1 giờ trước') ||
        (diff < 86400 && Math.floor(diff / 3600) + ' giờ trước'))) ||
    (daydiff == 1 && 'Hôm qua') ||
    (daydiff < 7 && daydiff + ' ngày trước') ||
    (daydiff < 31 && Math.ceil(daydiff / 7) + ' tuần trước')
  );
};

export const numberWithSpaces = (x: any) => {
  if (typeof x == 'string') x = Number(x);
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join('.');
};
export const formatLongText = (des: string, textLength: number) => {
  if (des.length > textLength) {
    return des.substring(0, textLength) + '...';
  }
  return des;
};

type UploadProgressCallback = ({ percent, uri }: any) => any;
type UploadSuccess = ({ resul, uri }: any) => any;
type UploadError = ({ error, uri }: any) => any;
type UploadCancel = (uri: string) => any;

export const uploadImage = (
  uri: string,
  percent: UploadProgressCallback,
  uploadSuccess: UploadSuccess,
  uploadError: UploadError,
  uploadCancel: UploadCancel,
): any => {
  console.log('Not check platform ios or android');
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    if (undefined !== accessToken) {
      const options: MultipartUploadOptions = {
        url: `${baseURL}/files/`,
        type: 'multipart',
        field: 'file',
        path: uri?.replace('file://', '') ?? '',
        method: 'POST',
        parameters: {
          file_type: 'CUSTOMER_IMAGE',
        },
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'content-type': 'multipart/form-data',
        },
        notification: {
          autoClear: true,
        },
      };

      Upload.startUpload(options)
        .then(uploadId => {
          console.log('Upload started');
          Upload.addListener('progress', uploadId, data => {
            //console.log(`Progress: ${data.progress}%`)
            //uploadProgress({ uri: uri, percent: data.progress })
            percent({ percent: data.progress, uri: uri });
          });
          Upload.addListener('error', uploadId, data => {
            console.log(`Error: ${data.error}`);
            uploadError({ error: data.error, uri: uri });
          });
          Upload.addListener('cancelled', uploadId, data => {
            console.log(`Cancelled!`);
            uploadCancel(uri);
          });
          Upload.addListener('completed', uploadId, data => {
            //  console.log('completed')
            //console.log(data.responseBody)
            // uploadSuccess()
            uploadSuccess({ result: data.responseBody, uri: uri });
          });
        })
        .catch(err => {
          console.log('Upload error!', err);
        });
    } else {
      console.log('uploadImage', 'accessToken is undefined');
    }
  } else {
    console.log('uploadImage', 'user is undefined');
  }
};
export const similar_text = (first: string, second: string): any => {
  //  discuss at: http://phpjs.org/functions/similar_text/
  // original by: Rafał Kukawski (http://blog.kukawski.pl)
  // bugfixed by: Chris McMacken
  // bugfixed by: Jarkko Rantavuori original by findings in stackoverflow (http://stackoverflow.com/questions/14136349/how-does-similar-text-work)
  // improved by: Markus Padourek (taken from http://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
  //   example 1: similar_text('Hello World!', 'Hello phpjs!');
  //   returns 1: 7
  //   example 2: similar_text('Hello World!', null);
  //   returns 2: 0

  if (
    first === null ||
    second === null ||
    typeof first === 'undefined' ||
    typeof second === 'undefined'
  ) {
    return 0;
  }

  first += '';
  second += '';

  var pos1 = 0,
    pos2 = 0,
    max = 0,
    firstLength = first.length,
    secondLength = second.length,
    p,
    q,
    l,
    sum;

  max = 0;

  for (p = 0; p < firstLength; p++) {
    for (q = 0; q < secondLength; q++) {
      for (
        l = 0;
        p + l < firstLength &&
        q + l < secondLength &&
        first.charAt(p + l) === second.charAt(q + l);
        l++
      );
      if (l > max) {
        max = l;
        pos1 = p;
        pos2 = q;
      }
    }
  }

  sum = max;

  if (sum) {
    if (pos1 && pos2) {
      //sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));
      const { tmpPos1, tmpPos2, tmpSum } = similar_text(
        first.substr(0, pos1),
        second.substr(0, pos2),
      );
      if (tmpSum) {
        console.log(' -- - - ', tmpSum);
        sum = sum + tmpSum;
      }
    }

    if (pos1 + max < firstLength && pos2 + max < secondLength) {
      // sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,
      //   secondLength - pos2 - max));

      const { tmpPos1, tmpPos2, tmpSum } = similar_text(
        first.substr(pos1 + max, firstLength - pos1 - max),
        second.substr(pos2 + max, secondLength - pos2 - max),
      );
      if (tmpSum) {
        console.log(' -- - - ', tmpSum);
        sum = sum + tmpSum;
      }
    }
  }

  // console.log("POS1:", pos1)
  // console.log("POS2:", pos2)
  // console.log("similarity count ", sum)
  return { pos1, pos2, sum };
  //return sum
};

export const searchString = (
  searchingTerm: string,
  comparedTerm: string,
): boolean => {
  let ret = false;

  const normalizedSearchTerm = searchingTerm
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  //console.log('Normalized search term', normalizedSearchTerm);

  const normalizedComparedTerm = comparedTerm
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  //console.log('Normalized comparedTerm', normalizedComparedTerm);

  const searchResult = similar_text(
    normalizedSearchTerm,
    normalizedComparedTerm,
  );

  if (0 != searchResult.sum) {
    const matchingPercent =
      (searchResult.sum * 100) / normalizedSearchTerm.length;
    const commonName = normalizedSearchTerm.substring(
      searchResult.pos1,
      searchResult.pos1 + searchResult.sum,
    );

    if (matchingPercent >= MATCHING_PERCENT) {
      ret = true;
      console.log(
        `matching ${matchingPercent} % = ${commonName}/ ${normalizedSearchTerm} vs ${normalizedComparedTerm}`,
      );
    }
  }

  return ret;
};

export const maskCurrency = (textMoney: string) => {
  textMoney = textMoney.replace(/\D/g, '');
  textMoney = textMoney.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  textMoney = textMoney.replace(/(?=(\d{3})+(\D))\B/g, ' ');
  return textMoney;
};

export const getPaymentMethodName = (type: any) => {
  let ret = 'Tiền mặt';
  switch (type) {
    case 'CARD_ATM':
      ret = 'Thẻ ATM';
      break;

    case 'WALLET_IN_APP':
      ret = 'Ví Mozanio';
      break;
    case 'CASH':
      ret = 'Tiền mặt';
      break;
    default:
      ret = 'Không xác định';
  }
  return ret;
};
