import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Controller, Control, Path, PathValue } from 'react-hook-form';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

interface InputProps<T> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  options?: OptionsOrGroups<PathValue<T, Path<T>>, GroupBase<PathValue<T, Path<T>>>>;
  isMulti: boolean;
  gap?: number;
}

export function CustomSelect<T>({ control, name, isMulti, options, label, gap }: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel mt={gap}>{label}</FormLabel>
          <Select {...field} isMulti={isMulti} options={options} />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
