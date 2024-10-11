import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  useDisclosure,
  useColorMode,
  Icon,
  Text,
  HStack, Tab,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const initialBrands = ['Codygo Inc']; 

const BrandModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brands, setBrands] = useState<string[]>(() => {
    const storedBrands = localStorage.getItem('brands');
    return storedBrands ? JSON.parse(storedBrands) : initialBrands;
  });
  const [formState, setFormState] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<string | null>(null);
  const { colorMode } = useColorMode();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(e.target.value);
  };

  const addBrand = () => {
    const newBrands = [...brands, formState];
    setBrands(newBrands);
    localStorage.setItem('brands', JSON.stringify(newBrands));
    setFormState('');
  };

  const deleteBrand = (brand: string) => { 
    const updatedBrands = brands.filter((b: string) => b !== brand);
    setBrands(updatedBrands);
    localStorage.setItem('brands', JSON.stringify(updatedBrands));
  };

  const editBrand = (brand: string) => {
    setFormState(brand);
    setCurrentBrand(brand);
    setIsEditing(true);
  };

  const saveEditedBrand = () => {
    const updatedBrands = brands.map((b: string) => (b === currentBrand ? formState : b));
    setBrands(updatedBrands);
    localStorage.setItem('brands', JSON.stringify(updatedBrands));
    setFormState('');
    setCurrentBrand(null);
    setIsEditing(false);
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
        Brands
      </Tab>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg={colorMode === 'light' ? 'white' : 'gray.800'} borderRadius="md" padding="10px">
          <ModalHeader>{isEditing ? 'Edit Brand' : 'Add New Brand'}</ModalHeader>
          <ModalCloseButton 
           onClick={() => {
            onClose();
            window.location.reload();
          }}/>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Brand Name"
                value={formState}
                onChange={handleFormChange}
              />
              {isEditing ? (
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={saveEditedBrand}
                  leftIcon={<EditIcon />}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={addBrand}
                  leftIcon={<AddIcon />}
                >
                  Add Brand
                </Button>
              )}
            </VStack>

            <Box mt={6}>
              <Text fontSize="lg" fontWeight="bold" marginBottom="20px">Brand List</Text>
              <VStack spacing={3} align="stretch">
                {brands.length > 0 ? (
                  brands.map((brand: string, index: number) => (
                    <HStack key={index} justifyContent="space-between" w="100%">
                      <Text>{brand}</Text>
                      <HStack>
                        <Icon
                          as={EditIcon}
                          boxSize={4}
                          cursor="pointer"
                          color="orange.400"
                          onClick={() => editBrand(brand)}
                        />
                        <Icon
                          as={DeleteIcon}
                          boxSize={4}
                          cursor="pointer"
                          color="red.400"
                          onClick={() => deleteBrand(brand)}
                        />
                      </HStack>
                    </HStack>
                  ))
                ) : (
                  <Text>No Brands Added</Text>
                )}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrandModal;
