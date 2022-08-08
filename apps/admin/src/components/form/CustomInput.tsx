import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { Controller, Control, Path } from 'react-hook-form';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface InputProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  html5required?: boolean;
  type: HTMLInputTypeAttribute | 'textarea';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  gap?: number;
  bg?: string;
}

export function CustomInput<T>({
  c,
  name,
  type,
  html5required = false,
  label,
  gap,
  bg = 'white',
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={c}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} isRequired={html5required}>
          <FormLabel gap={gap}>{label}</FormLabel>
          {type === 'textarea' ? (
            <Textarea {...field} value={(field.value as string) || ''} bg={bg} />
          ) : (
            <Input type={type} {...field} value={(field.value as string) || ''} bg={bg} />
          )}
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
