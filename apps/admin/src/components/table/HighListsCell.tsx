import { Flex, Highlight, Tag } from '@chakra-ui/react';

interface TagsCellProps {
  values: { name: string; id: number }[];
}

const colors: string[] = ['red', 'blue', 'orange', 'purple', 'green'];

export const TagsCell = ({ values }: TagsCellProps) => {
  return (
    <>
      {values.map((v) => (
        <Tag
          key={v.id}
          border="1px"
          colorScheme={colors[v.id % colors.length]}
          rounded={'full'}
          m="0.5"
        >{v.name}</Tag>
      ))}
    </>
  );
};
