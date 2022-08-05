import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { Controller, Control, Path } from 'react-hook-form';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface InputProps<T> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  isRequired?: boolean;
  type: HTMLInputTypeAttribute | 'textarea';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  gap?: number;
  bg?: string;
}

export function CustomInput<T>({
  control,
  name,
  type,
  isRequired = false,
  label,
  gap,
  bg = 'white',
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <FormLabel gap={gap}>{label}</FormLabel>
          {type === 'textarea' ? (
            <Textarea
              ref={ref}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value as string}
              bg={bg}
            />
          ) : (
            <Input
              type={type}
              ref={ref}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value as string}
              bg={bg}
            />
          )}
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
