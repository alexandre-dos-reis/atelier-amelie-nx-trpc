import { Tag } from '@chakra-ui/react';

interface TagsCellProps {
  values: { label: string; value: number }[];
}

const colors: string[] = ['red', 'blue', 'orange', 'purple', 'green'];

export const TagsCell = ({ values }: TagsCellProps) => {
  return (
    <div>
      {values.map((v) => (
        <Tag
          key={v.value}
          border="1px"
          colorScheme={colors[v.value % colors.length]}
          rounded={'full'}
          m="0.5"
        >
          {v.label}
        </Tag>
      ))}
    </div>
  );
};
