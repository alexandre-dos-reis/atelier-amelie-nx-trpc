import { FormControl, FormLabel } from '@chakra-ui/react';
import { Path, PathValue } from 'react-hook-form';
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { colourOptions } from 'utils';

interface InputProps<T> {
  label: string;
  required?: boolean;
  options?: OptionsOrGroups<PathValue<T, Path<T>>, GroupBase<PathValue<T, Path<T>>>>;
  isMulti?: boolean;
  gap?: number;
}

export function UncontrolledSelect<T>({
  isMulti = false,
  options,
  label,
  gap,
  required = false,
}: InputProps<T>) {
  const style: StylesConfig<PathValue<T, Path<T>>, typeof isMulti> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    multiValue: (styles, { index }) => {
      return {
        ...styles,
        backgroundColor: chroma(colourOptions[index % colourOptions.length].color)
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
      border: provided.border,
    }),
  };

  return (
    <FormControl isRequired={required}>
      <FormLabel mt={gap}>{label}</FormLabel>
      <Select isMulti={isMulti} options={options} styles={style} />
    </FormControl>
  );
}
