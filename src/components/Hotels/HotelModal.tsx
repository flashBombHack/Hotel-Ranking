import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Input,
  Select,
  Textarea,
  useDisclosure,
  useColorMode,
  Icon, 
  Tab
} from '@chakra-ui/react';
import { StarIcon, AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const initialHotels = [
  {
    name: 'CodyGo Hotel',
    city: 'San Francisco',
    address: '123 Codygo St',
    country: 'USA',
    brand: 'Hotel inc',
    rating: 4,
    price: 50,
    images: ['https://via.placeholder.com/400x300'],
  },
];


const HotelModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hotels, setHotels] = useState(() => {
    const storedHotels = localStorage.getItem('hotels');
    return storedHotels ? JSON.parse(storedHotels) : initialHotels;
  });
  const [selectedHotel, setSelectedHotel] = useState(hotels[0] || null);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [isEditingHotel, setIsEditingHotel] = useState(false);
  const [uploadedImageNames, setUploadedImageNames] = useState<string[]>(['', '']);
  const { colorMode } = useColorMode();

  const [formState, setFormState] = useState<{
    name: string;
    city: string;
    address: string;
    country: string;
    brand: string;
    rating: number;
    price: string;
    images: string[];
  }>({
    name: '',
    city: '',
    address: '',
    country: '',
    brand: '',
    rating: 0,
    price: '',
    images: [],
  });
  

  interface Hotel {
    name: string;
    city: string;
    address: string;
    country: string;
    brand: string;
    rating: number;
    price: string;
    images: string[];
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedImages = [...formState.images];
        updatedImages[index] = base64String;
        setFormState({ ...formState, images: updatedImages });
      };
      reader.readAsDataURL(file); 
  
      // Update the uploaded image name
      const updatedNames = [...uploadedImageNames];
      updatedNames[index] = file.name; 
      setUploadedImageNames(updatedNames); 
    }
  };


  const handleRatingChange = (rating: number) => {
    setFormState({ ...formState, rating });
  };

 
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value.startsWith('$')) {
      setFormState({ ...formState, price: `$${value}` });
    } else {
      setFormState({ ...formState, price: value });
    }
  };

  const addHotel = () => {
    const newHotels = [...hotels, formState];
    setHotels(newHotels);
    localStorage.setItem('hotels', JSON.stringify(newHotels));
    setIsAddingHotel(false);
  };

  const deleteHotel = () => {
    const updatedHotels = hotels.filter((hotel: Hotel) => hotel !== selectedHotel);
    setHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    setSelectedHotel(updatedHotels[0] || null); 
  };

  const [brands, setBrands] = useState<string[]>([]);

useEffect(() => {
  const storedBrands = localStorage.getItem('brands');
  if (storedBrands) {
    setBrands(JSON.parse(storedBrands)); 
  }
}, []);
  

  useEffect(() => {
    if (hotels.length > 0) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels]);


  const handleEditHotel = () => {
    
    setFormState(selectedHotel);
    
   
    const updatedHotels = hotels.filter((hotel: Hotel) => hotel.name !== selectedHotel.name);
    setHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));

  
    setIsEditingHotel(true);
    setIsAddingHotel(true);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (selectedHotel.images.length));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedHotel.images.length) % selectedHotel.images.length);
  };

  return (
    <>
      <Tab
        onClick={onOpen}
        _selected={{ color: 'white', bg: 'orange.400' }}
        border="1px solid"
        borderRadius="12px"
        p={3}
        fontSize="sm"
        height="30px"
        ml={4}
      >
        Hotels
      </Tab>

      <Modal isOpen={isOpen} onClose={onClose} size={isAddingHotel ? "xl" : "6xl"}> 
        <ModalOverlay />
        <ModalContent bg={colorMode === 'light' ? 'white' : 'gray.800'} borderRadius="md">
          <ModalHeader>
            {isAddingHotel ? 'Add New Hotel' : 'All Hotels'}
            <ModalCloseButton
            onClick={() => {
              onClose(); 
              window.location.reload(); 
            }}
          />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Box flex="1" pr={4}>
                {!isAddingHotel ? (
                  hotels.length > 0 ? (
                    <VStack spacing={3} align="start">
                      {hotels.map((hotel: Hotel, index: number) => (
                        <Button
                          key={index}
                          onClick={() => setSelectedHotel(hotel)}
                          width="100%"
                          justifyContent="flex-start"
                          variant="outline"
                          colorScheme="orange"
                          borderRadius="md"
                        >
                          {hotel.name}
                        </Button>
                      ))}
                    </VStack>
                  ) : (
                    <Box textAlign="center" p={6}>
                      <Text>No Hotels Added</Text>
                      <Button mt={4} colorScheme="orange" onClick={() => setIsAddingHotel(true)}>
                        Add New Hotel
                      </Button>
                    </Box>
                  )
                ) : (
                  <VStack spacing={4} align="stretch">
                    <Input
                      placeholder="Hotel Name"
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                    />
                    <Input
                      placeholder="City"
                      name="city"
                      value={formState.city}
                      onChange={handleFormChange}
                    />
                    <Input
                      placeholder="Country"
                      name="country"
                      value={formState.country}
                      onChange={handleFormChange}
                    />
                    <Textarea
                      placeholder="Address"
                      name="address"
                      value={formState.address}
                      onChange={handleFormChange}
                    />
                   <Select name="brand" value={formState.brand} onChange={handleFormChange}>
                      <option value="">Select Brand</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </Select>

                    <Text>Rating</Text>
                    <HStack>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          as={StarIcon}
                          key={star}
                          boxSize={6}
                          cursor="pointer"
                          color={star <= formState.rating ? 'orange.400' : 'gray.300'}
                          onClick={() => handleRatingChange(star)}
                        />
                      ))}
                    </HStack>

                    <Input
                      placeholder="Price per person"
                      name="price"
                      value={formState.price}
                      onChange={handlePriceChange}
                    />

                    {/* Stylish Image Upload Box */}
                    <Text>Upload Hotel Images</Text>
                    {[0, 1].map((index) => (
                    <Box
                        key={index}
                        as="label"
                        htmlFor={`image-upload-${index}`}
                        border="2px dashed"
                        borderColor="gray.300"
                        p={6}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        cursor="pointer"
                        borderRadius="md"
                        _hover={{ borderColor: 'orange.400', color: 'orange.400' }}
                    >
                        <AddIcon boxSize={8} />
                        <Text mt={2}>
                        {uploadedImageNames[index] ? uploadedImageNames[index] : `Click to upload image ${index + 1}`}
                        </Text>
                        <Input
                        type="file"
                        id={`image-upload-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        hidden
                        />
                    </Box>
                    ))}

                    <Button
                      size="sm"
                      colorScheme="orange"
                      onClick={addHotel}
                      leftIcon={<AddIcon />}
                    >
                      Save Hotel
                    </Button>
                  </VStack>
                )}
              </Box>

              {!isAddingHotel && selectedHotel && (
        <Box flex="2" position="relative">
          <Image
            src={selectedHotel.images[currentImageIndex] || 'https://via.placeholder.com/400x300'}
            alt={selectedHotel.name}
            width="100%"
            height="500px" 
            objectFit="cover" 
            borderRadius="md"
          />
      
          <Box 
            position="absolute" 
            top={0} 
            left={0} 
            width="100%" 
            height="100%" 
            bg="rgba(0, 0, 0, 0.5)" 
            borderRadius="md"
          />
          <Box 
            position="absolute" 
            bottom="20px" 
            left="20px" 
            color="white" 
            zIndex={1}
            textAlign="left"
          >
            <Icon as={DeleteIcon} boxSize={6} color="white" onClick={deleteHotel} position="absolute" top="-300px" right="-320px" cursor="pointer" />
            <Icon 
              as={EditIcon} 
              boxSize={6} 
              color="white" 
              onClick={handleEditHotel} 
              position="absolute" 
              top="-300px" 
              right="-290px" 
              cursor="pointer" 
            />
            <Text fontSize="2xl" fontWeight="bold">{selectedHotel.name}</Text>
            <Text fontSize="lg">{selectedHotel.city}, {selectedHotel.country}</Text>
            <Flex mt={2}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Icon
                  as={StarIcon}
                  key={index}
                  boxSize={5}
                  color={index <= selectedHotel.rating ? 'orange.400' : 'gray.300'}
                />
              ))}
            </Flex>
            <Text fontSize="lg" fontWeight="bold" mt={2}>{selectedHotel.price}/person</Text>
            <Text>{selectedHotel.address}</Text>
          </Box>

          {/* Navigation Buttons */}
          {selectedHotel.images.length > 1 && (
            <>
              <Button
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handlePrevImage}
                colorScheme="orange"
                size="sm"
              >
                Prev
              </Button>
              <Button
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handleNextImage}
                colorScheme="orange"
                size="sm"
              >
                Next
              </Button>
            </>
          )}
        </Box>
      )}
            </Flex>

            {hotels.length > 0 && !isAddingHotel && (
              <Button mt={6} colorScheme="orange" onClick={() => setIsAddingHotel(true)} leftIcon={<AddIcon />}>
                Add New Hotel
              </Button>
            )}

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HotelModal;
