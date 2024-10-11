import { Box, Image, Text, Flex, Icon, VStack, useColorMode, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md'; 


interface Hotel {
  name: string;
  brand: string;
  rating: number;
  price: number;
  city: string;
  country: string;
  address: string;
  images: string[]; 
}

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const { colorMode } = useColorMode(); 
  const { name, brand, rating, price, city, country, address, images } = hotel; 
  

  const [isOpen, setIsOpen] = useState(false);

 
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

 
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?&q=${encodeURIComponent(address)}`;

  return (
    <Box
      width="310px"
      height="400px"
      bg={colorMode === 'light' ? 'white' : 'gray.700'} 
      borderRadius="15px"
      boxShadow="md"
      overflow="hidden"
      color={colorMode === 'light' ? 'black' : 'white'} 
    >
   
      <Image
        src={images[0]} 
        alt={name} 
        width="100%"
        height="190px"
        objectFit="cover"
      />

   
      <VStack align="start" p={4} spacing={3}>
       
        <Text fontSize="16px" fontWeight="bold">
          {name}
        </Text>

    
        <Text fontSize="14px" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>
          {brand}
        </Text>

     
        <Flex>
          {[1, 2, 3, 4, 5].map((index) => (
            <Icon
              as={StarIcon}
              key={index}
              boxSize={5}
              color={index <= rating ? 'orange.400' : 'gray.300'}
            />
          ))}
        </Flex>

   
        <Text fontSize="14px">
          <Text as="span" fontWeight="bold" fontSize="16px">
            {price}
          </Text>
          /person
        </Text>

       
        <Flex justify="space-between" width="100%">
          <Text fontSize="11px" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
            {city}, {country}
          </Text>

          <Button
            size="sm"
            colorScheme="orange"
            variant="solid"
            borderRadius="full"
            height="28px"
            onClick={onOpen}
            leftIcon={<MdLocationOn />}
            px={2}
            boxShadow="md"
            _hover={{ bg: "orange.600", boxShadow: "lg" }}
            fontSize="11px" 
          >
            View on Map
          </Button>
        </Flex>

      
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hotel Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>{address}</Text>
              <Box
                height="300px"
                width="100%"
                borderRadius="8px"
                overflow="hidden"
              >
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={googleMapsUrl}
                  allowFullScreen
                />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default HotelCard;
