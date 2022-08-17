import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Controller, Control, Path, PathValue } from 'react-hook-form';
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { colourOptions } from '../../utils/colours-options';

interface InputProps<T> {
  c: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  options?: OptionsOrGroups<PathValue<T, Path<T>>, GroupBase<PathValue<T, Path<T>>>>;
  isMulti: boolean;
  gap?: number;
}

export function CustomSelect<T>({
  c,
  name,
  isMulti,
  options,
  label,
  gap,
  required = false,
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={c}
      render={({ field, fieldState: { error } }) => {
        const style: StylesConfig<PathValue<T, Path<T>>, typeof isMulti> = {
          control: (styles) => ({ ...styles, backgroundColor: 'white' }),
          multiValue: (styles, { index }) => {
            return {
              ...styles,
              backgroundColor: chroma(colourOptions[(index) % colourOptions.length].color)
                .alpha(0.1)
                .css(),
            };
          },
          multiValueLabel: (styles, { index }) => ({
            ...styles,
            color: colourOptions[index % colourOptions.length].color,
          }),
          multiValueRemove: (styles, { index }) => ({
            ...styles,
            color: colourOptions[index % colourOptions.length].color,
            ':hover': {
              backgroundColor: colourOptions[index % colourOptions.length].color,
              color: 'white',
            },
          }),
          container: (provided, state) => ({
            ...provided,
            border: !error ? provided.border : '1px solid red',
          }),
        };

        return (
          <FormControl isInvalid={!!error} isRequired={required}>
            <FormLabel mt={gap}>{label}</FormLabel>
            <Select {...field} isMulti={isMulti} options={options} styles={style} />
            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
}
