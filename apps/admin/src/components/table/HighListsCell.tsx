import { Tag } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
interface TagsCellProps {
  values: { name: string; id: number }[];
}

const colors: string[] = ['red', 'blue', 'orange', 'purple', 'green'];

export const TagsCell = ({ values }: TagsCellProps) => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={animationParent}>
      {values.map((v) => (
        <Tag
          key={v.id}
          border="1px"
          colorScheme={colors[v.id % colors.length]}
          rounded={'full'}
          m="0.5"
        >
          {v.name}
        </Tag>
      ))}
    </div>
  );
};
