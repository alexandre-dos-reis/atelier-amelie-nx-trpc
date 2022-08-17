import { Tag } from '@chakra-ui/react';
import { colourOptions } from '../../utils/colours-options';
import chroma from 'chroma-js';

interface TagsCellProps {
  values: { label: string; value: number }[];
}

export const TagsCell = ({ values }: TagsCellProps) => {
  return (
    <div>
      {values.map((v) => (
        <Tag
          key={v.value}
          border="0px"
          color={chroma(colourOptions[(v.value - 1) % colourOptions.length].color).brighten(0.1).hex()}
          bg={chroma(colourOptions[(v.value - 1) % colourOptions.length].color).alpha(0.1).hex()}
          m="0.5"
        >
          {v.label}
        </Tag>
      ))}
    </div>
  );
};
