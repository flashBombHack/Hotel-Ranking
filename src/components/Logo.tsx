import { Box, Text, useColorMode } from '@chakra-ui/react';

const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Text fontWeight="normal" fontSize="2xl" color="orange.400" display="inline">
        Hotel
      </Text>
      <Text fontWeight="bold" fontSize="2xl" color={colorMode === 'light' ? 'black' : 'white'} display="inline">
        Ranking
      </Text>
    </Box>
  );
};

export default Logo;
