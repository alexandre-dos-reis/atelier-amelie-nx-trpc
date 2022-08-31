import { PURCHASE_STATUS } from '@prisma/client';

type StatusItem = {
  value: string;
  color: string;
};

type StatusesType = {
  [key in PURCHASE_STATUS]: StatusItem;
};

const StatusesTranslation: StatusesType = {
  CANCELED: {
    value: 'annulé',
    color: 'red',
  },
  DELIVERED: {
    value: 'livré',
    color: 'green',
  },
  DELIVERING: {
    value: 'en livraison',
    color: 'yellow',
  },
  IN_PREPARATION: {
    value: 'en préparation',
    color: 'purple',
  },
  REFUNDED: {
    value: 'remboursé',
    color: 'green',
  },
  WAITING_FOR_PAYMENT: {
    value: 'en attente de paiment',
    color: 'blue',
  },
};

export function getStatus(status: PURCHASE_STATUS): StatusItem {
  return StatusesTranslation[status];
}
