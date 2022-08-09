import { Highlight, Tag } from '@chakra-ui/react';

interface TagsCellProps {
  values: { name: string; id: number }[];
}

const colors: string[] = ['red', 'blue', 'orange', 'purple', 'green'];

export const TagsCell = ({ values }: TagsCellProps) => {
  return (
    <>
      {values.map((v) => (
        <Tag key={v.id} colorScheme={colors[v.id % colors.length]} rounded={'full'} mx="0.5">
          {v.name}
        </Tag>
      ))}
    </>
  );
};
