import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  InputLeftElement,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import { Controller, Control, Path } from 'react-hook-form';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useCallback,
  useState,
} from 'react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';

interface InputProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  isLocked?: boolean;
  setIsLocked?: React.Dispatch<React.SetStateAction<boolean>>;
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
  isLocked = false,
  setIsLocked,
  label,
  gap,
  bg = 'white',
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={c}
      render={({ field, fieldState: { error } }) => {
        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          if (type === 'number') {
            const value = e.target.valueAsNumber;
            field.onChange(isNaN(value) ? 0 : value);
          } else {
            field.onChange(e.target.value);
          }
        };

        return (
          <FormControl isInvalid={!!error} isRequired={required}>
            <FormLabel gap={gap}>{label}</FormLabel>
            <InputGroup>
              {disabled && (
                <>
                  <Button
                    onClick={() => {
                      if (setIsLocked) {
                        setIsLocked((val) => !val);
                      }
                    }}
                  />
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      isLocked ? <LockIcon color="gray.500" /> : <UnlockIcon color="gray.500" />
                    }
                  />
                </>
              )}
              {type === 'textarea' ? (
                <Textarea
                  disabled={disabled && isLocked}
                  {...field}
                  value={(field.value as string) || ''}
                  bg={bg}
                />
              ) : (
                <Input
                  disabled={disabled && isLocked}
                  type={type}
                  {...field}
                  onChange={handleOnChange}
                  value={field.value as string | number | readonly string[] | undefined}
                  bg={bg}
                />
              )}
            </InputGroup>
            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
}
