import { Box, Flex, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { CustomInput as Input } from 'components/form';
import { shippingCost as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BackBtn, SubmitBtn } from 'components/buttons';

interface ShippingCostFormProps {
  children?: ReactNode;
  shippingCost: schema.updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType>;
  textSubmitButton: string;
  isSubmitting?: boolean;
}

export const ShippingCostForm = ({
  shippingCost,
  onSubmit,
  textSubmitButton,
  isSubmitting = false,
  children,
}: ShippingCostFormProps) => {
  // Form
  const {
    control: c,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<schema.updateOrCreateOneSchemaType>({
    resolver: zodResolver(schema.updateOrCreateOneSchema),
    defaultValues: shippingCost,
    mode: 'onChange',
  });

  // UI
  const gap = 5;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={gap}>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="number" name="max" label="Palier" required />
            <Input c={c} type="number" name="insuranceCost" label="Frais d'assurance" required />
            <Input c={c} type="number" name="weightCost" label="Frais de port" required />
          </Flex>
        </VStack>
        <Flex justifyContent="space-between" mt={gap + 5}>
          <BackBtn />
          <SubmitBtn
            label={textSubmitButton}
            isDisabled={!isValid || !isDirty}
            isLoading={isSubmitting}
          />
          {children}
        </Flex>
      </form>
    </Box>
  );
};
