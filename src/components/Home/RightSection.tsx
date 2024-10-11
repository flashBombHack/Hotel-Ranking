import { Box, Flex, Text, Grid, useColorMode } from '@chakra-ui/react';
import HotelCard from './HotelCard'; 
import { useEffect, useState } from 'react';

interface Hotel {
  name: string;
  brand: string;
  images: string[];
  rating: number;
  price: number;
  city: string;
  country: string;
  address: string;
}

interface RightSectionProps {
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  filters: { brand: string; location: string }; 
}

const RightSection = ({ selectedBrands}: RightSectionProps) => {
  const { colorMode } = useColorMode();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const storedHotels = localStorage.getItem('hotels');
    if (storedHotels) {
      const sortedHotels = JSON.parse(storedHotels).sort((a: Hotel, b: Hotel) => b.rating - a.rating);
      setHotels(sortedHotels);
    }
  }, []);

  const filteredHotels = selectedBrands.length > 0
  ? hotels.filter(hotel => selectedBrands.includes(hotel.brand))
  : hotels;

  return (
    <Box
      flex="1"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="lg"
      boxShadow="md"
      p={5}
      ml={4}
      mt={4}
      min-height="700px"
    >
    
      <Flex justify="space-between" align="center" mb={4}>
        <Text 
          fontSize="16px" 
          fontWeight="bold" 
          textTransform="uppercase" 
          letterSpacing="wide" 
          color="orange.400"
          borderBottom="2px solid"
          borderColor="orange.400"
          pb={1}
        >
          Top Ranked Hotels
        </Text>
        <Text 
          fontSize="12px" 
          fontWeight="medium" 
          color="gray.500"
          textAlign="right"
        >
          View the list of all ranked hotels here
        </Text>
      </Flex>

   
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))
        ) : (
          <Text>No Hotels Available</Text>
        )}
      </Grid>
    </Box>
  );
};

export default RightSection;