import { PhoneIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, VStack, Text } from '@chakra-ui/react';
import { Address } from '@prisma/client';
import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../utils/trpc';

export const PurchaseEdit = () => {
  const params = useParams();
  const id = params['id'] as string;
  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess, error } = trpc.useQuery(['purchase.getOne', id]);

  const gap = 5;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <Stack spacing={8} direction="row">
        <Box p={5} shadow="md" borderWidth="1px" bg="white">
          <Heading fontSize="xl">Commande</Heading>
          <Text mt={4}>
            Effectuée le :{' '}
            <b>
              {data?.purchase.purchaseAt.toLocaleDateString()} à{' '}
              {data?.purchase.purchaseAt.toLocaleTimeString()}
            </b>
            <br />
            Numéro : <b>{data?.purchase.id}</b>
            <br />
            Id Stripe : <b>{data?.purchase.stripeId}</b>
            <br />
            Num Suivi : <b>{data?.purchase.trackingNumber}</b>
            <br />
            Courriel : <b>{data?.purchase.email}</b>
            <br />
            État : <b>{data?.purchase.status}</b>
            <br />
          </Text>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" bg="white" flex="1">
          <Heading fontSize="xl">Adresse(s)</Heading>
          {data?.purchase.addresses.length === 1 ? (
            <AddressItem
              address={data?.purchase.addresses.find((a) => a.type === 'SINGLE') ?? ({} as Address)}
            />
          ) : (
            <>
              <AddressItem
                address={
                  data?.purchase.addresses.find((a) => a.type === 'DELIVERY') ?? ({} as Address)
                }
              />
              <AddressItem
                address={
                  data?.purchase.addresses.find((a) => a.type === 'BILLING') ?? ({} as Address)
                }
              />
            </>
          )}
        </Box>
      </Stack>
      <Stack>
        <Box p={5} shadow="md" borderWidth="1px" bg="white" flex="1" px={7} mt={gap}>
          <Heading fontSize="xl">Produit(s) commandé(s)</Heading>
          <ul>
            {data?.purchase.purchaseItems.map((i) => (
              <li>
                {i.name} : {i.quantity} x {i.price}
              </li>
            ))}
          </ul>
          <Text>Frais d'assurance : {data?.purchase.insuranceCost}</Text>
          <Text>Frais de port : {data?.purchase.weightCost}</Text>
          <Text>
            Total :{' '}
            {data?.purchase.purchaseItems.map((i) => i.quantity * i.price).reduce((a, b) => a + b) + data?.purchase.insuranceCost + data?.purchase.weightCost}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

interface AddressItemProps {
  address: Address;
}

const AddressItem = ({ address }: AddressItemProps) => {
  return (
    <Box mt="5">
      <Heading fontSize="1xl">{address.type}</Heading>
      <Text mt={4}>
        {address.fullname}
        <br />
        {address.addressLine1}
        <br />
        {address.addressLine2 ? (
          <>
            <span>{address.addressLine2}</span>
            <br />
          </>
        ) : (
          ''
        )}
        {address.postalCode}
        <br />
        {address.city} {address.country}
        <br />
        Tél : {address.phone}
        <br />
      </Text>
    </Box>
  );
};
