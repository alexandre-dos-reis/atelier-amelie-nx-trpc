import { Control, Controller, Path } from 'react-hook-form';
import DatePicker from 'react-date-picker';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

interface CustomDatePickerProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  gap?: number;
}

export function CustomDatePicker<T>({ c, name, label, gap }: CustomDatePickerProps<T>) {
  return (
    <Controller
      control={c}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel mt={gap}>{label}</FormLabel>
          <DatePicker onChange={onChange} value={value as Date} />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
