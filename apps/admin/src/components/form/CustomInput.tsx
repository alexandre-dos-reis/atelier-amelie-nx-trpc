import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { Controller, Control, Path } from 'react-hook-form';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { LockIcon, PhoneIcon } from '@chakra-ui/icons';

interface InputProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  type: HTMLInputTypeAttribute | 'textarea';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  gap?: number;
  bg?: string;
}

export function CustomInput<T>({
  c,
  name,
  type,
  required = false,
  disabled = false,
  label,
  gap,
  bg = 'white',
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={c}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} isRequired={required}>
          <FormLabel gap={gap}>{label}</FormLabel>
          <InputGroup>
            {disabled && (
              <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
            )}
            {type === 'textarea' ? (
              <Textarea
                disabled={disabled}
                {...field}
                value={(field.value as string) || ''}
                bg={bg}
              />
            ) : (
              <Input
                disabled={disabled}
                type={type}
                {...field}
                value={(field.value as string) || ''}
                bg={bg}
              />
            )}
          </InputGroup>
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
