import { Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface BackBtnProps {
  to?: string;
  label?: string;
}

export const BackBtn = ({ to, label = 'Retour' }: BackBtnProps) => {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  if (to) {
    return (
      <Button as={Link} to={to} colorScheme="blue">
        <ArrowBackIcon marginEnd="3" />
        {label}
      </Button>
    );
  } else {
    return (
      <Button onClick={goBack} colorScheme="blue">
        <ArrowBackIcon marginEnd="3" />
        {label}
      </Button>
    );
  }
};
