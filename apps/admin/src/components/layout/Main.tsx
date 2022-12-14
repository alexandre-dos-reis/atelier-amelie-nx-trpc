import { GridItem, useColorModeValue } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { RouterComponent as Router} from '../../routes/RouterComponent';

export const Main = () => {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <GridItem
      area={'main'}
      overflowY={'scroll'}
      overflowX={'hidden'}
      bg={useColorModeValue('gray.100', 'gray.900')}
      paddingBottom="20"
      ref={animationParent}
    >
      <Router />
    </GridItem>
  );
};
