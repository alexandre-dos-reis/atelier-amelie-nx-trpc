import { FormControl, FormLabel, Input, FormErrorMessage, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, Control, Path } from 'react-hook-form';

interface InputProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  gap?: number;
  bg?: string;
}

export function CustomSwitch<T>({ c, name, label, gap }: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={c}
      render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel gap={gap}>{label}</FormLabel>
          <Switch
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            isChecked={value as boolean}
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
