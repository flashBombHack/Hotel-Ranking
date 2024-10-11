import React, { useState } from 'react';
import {
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  HStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface HotelFormState {
  name: string;
  city: string;
  country: string;
  address: string;
  brand: string;
  rating: number;
  price: number;
  images: string[];
}

interface AddHotelFormProps {
  hotels: HotelFormState[];
  setHotels: React.Dispatch<React.SetStateAction<HotelFormState[]>>;
  setIsAddingHotel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHotelForm: React.FC<AddHotelFormProps> = ({ hotels, setHotels, setIsAddingHotel }) => {
  const [formState, setFormState] = useState<HotelFormState>({
    name: '',
    city: '',
    country: '',
    address: '',
    brand: '',
    rating: 0,
    price: 0,
    images: [],
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const updatedImages = [...formState.images];
      updatedImages[index] = URL.createObjectURL(files[0]);
      setFormState({ ...formState, images: updatedImages });
    }
  };

  const addHotel = () => {
    const newHotels = [...hotels, formState];
    setHotels(newHotels);
    localStorage.setItem('hotels', JSON.stringify(newHotels));
    setIsAddingHotel(false);
  };

  return (
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
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
      </Select>
      <HStack>
        <Input
          placeholder="Rating"
          name="rating"
          type="number"
          value={formState.rating}
          onChange={handleFormChange}
        />
        <Input
          placeholder="Price per person"
          name="price"
          type="number"
          value={formState.price}
          onChange={handleFormChange}
          onBlur={(e) => (e.target.value = `$${e.target.value}`)}
        />
      </HStack>

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
          <Text mt={2}>Click to upload image {index + 1}</Text>
          <Input
            type="file"
            id={`image-upload-${index}`}
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
            hidden
          />
        </Box>
      ))}

      <Button colorScheme="orange" onClick={addHotel} leftIcon={<AddIcon />} size="sm">
        Save Hotel
      </Button>
    </VStack>
  );
};

export default AddHotelForm;
