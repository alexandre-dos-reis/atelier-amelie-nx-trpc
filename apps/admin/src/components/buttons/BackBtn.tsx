import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface BackBtnProps {
  to: string;
  label?: string;
}

export const BackBtn = ({ to, label = 'Retour' }: BackBtnProps) => {
  return (
    <Button as={Link} to={to} colorScheme="blue">
      <ArrowBackIcon marginEnd="3" />
      {label}
    </Button>
  );
};
