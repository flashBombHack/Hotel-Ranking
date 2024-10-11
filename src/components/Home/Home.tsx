import { Box, Flex, Input, IconButton, useColorMode, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt, FaBuilding, FaCaretDown } from 'react-icons/fa';
import DownSection from './DownSection'; 
import { useState } from 'react';

const Home = () => {
  const { colorMode } = useColorMode();
  
  const [location, setLocation] = useState('');
  const [brand, setBrand] = useState('');
  const [filters, setFilters] = useState({ brand: '', location: '' });

  const handleSearch = () => {
    setFilters({ brand, location }); 
  };

  return (
    <Box
      bg={colorMode === 'light' ? 'rgb(242 242 242)' : 'rgba(40, 40, 40, 0.8)'}
      borderRadius="lg"
      p={4}
      minW="100vw"
      h="70px"
    >
      <Flex align="center" h="100%">
       
        <InputGroup w="30%" mx={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<FaMapMarkerAlt color="black" />}
          />
          <Input
            placeholder="Enter Location"
            variant="filled"
            borderRadius="md"
            fontSize="14px"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.400', fontSize: '12px' }}
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
          />
        </InputGroup>

       
        <InputGroup w="20%" mx={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<FaBuilding color={colorMode === 'light' ? 'black' : 'white'} />}
          />
          <Input
            placeholder="Select Brand"
            variant="filled"
            borderRadius="md"
            fontSize="14px"
            value={brand}
            onChange={(e) => setBrand(e.target.value)} 
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.400', fontSize: '12px' }}
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
          />
          <InputRightElement>
            <FaCaretDown color={colorMode === 'light' ? 'gray.500' : 'gray.300'} />
          </InputRightElement>
        </InputGroup>

      
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={handleSearch} 
          bg="black"
          color="white"
          _hover={{ bg: 'gray.700' }}
        />
      </Flex>

 
      <DownSection filters={filters} />
    </Box>
  );
};

export default Home;
