import { ADDRESS_TYPE } from '@prisma/client';

type AddressItem = {
  value: string;
  color: string;
};

type StatusesType = {
  [key in ADDRESS_TYPE]: AddressItem;
};

const AddressesTranslation: StatusesType = {
  BILLING: {
    value: 'facturation',
    color: 'gray',
  },
  DELIVERY: {
    value: 'livraison',
    color: 'green',
  },
  SINGLE: {
    value: 'principale',
    color: 'green',
  },
};

export function getAddress(status: ADDRESS_TYPE): AddressItem {
  return AddressesTranslation[status];
}
