// src/components/Header.tsx
import { Box, Flex, Tab, TabList, Tabs, Avatar, useColorMode, IconButton, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Text } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import HotelModal from './Hotels/HotelModal'; 
import BrandModal from './Brands/BrandModal'; 

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [inputName, setInputName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check for username in localStorage
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      onOpen(); // Open modal if no username is found
    } else {
      setUsername(storedUsername);
    }
  }, [onOpen]);

  const handleSave = () => {
    if (inputName.length >= 5) {
      localStorage.setItem('username', inputName);
      setUsername(inputName);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    setIsButtonDisabled(e.target.value.length < 5); 
  };

  return (
    <Box bg="rgb(253, 253, 253)" _dark={{ bg: "gray.800" }}  minW="50vw" p={4} boxShadow="sm">
      <Flex align="center" justify="space-between"  minW="50vw" w="auto">
        <Logo />
        <Flex justify="center">
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                _selected={{ color: "white", bg: "orange.400" }}
                border="1px solid"
                borderRadius="12px"
                p={3}
                fontSize="sm"
                height="30px"
                ml={4}
              >
                Home
              </Tab>
              <HotelModal />
              <BrandModal />
            </TabList>
          </Tabs>
        </Flex>

        <Flex align="center">
          <Avatar name={username || 'Codygo'} size="sm" mr={2} />
          <Box fontWeight="bold" mr={4}>
            {username || 'Codygo'}
          </Box>
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Modal for Username Input */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to Hotel Ranking</ModalHeader>
          <ModalBody>
            <Text mb={4}>
              Please enter your username (at least 5 characters) to continue.
            </Text>
            <Input
              value={inputName}
              onChange={handleInputChange}
              placeholder="Enter your username"
              mb={4}
              isRequired
            />
            <Text fontSize="sm" color="gray.500">
          This is an assessment by Codygo: <strong>Hotel Ranking</strong>. You can add, edit, manage, group, and filter hotels and brands.
          It also includes a light and dark theme feature that you can toggle at the top right corner.
        </Text>

        <Text fontSize="sm" color="gray.500" fontWeight="bold" mt={4}>
          Created by Abdullahi Ismail <br />
          Email: <a href="mailto:Abdulhena090@gmail.com">Abdulhena090@gmail.com</a>
        </Text>

          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              onClick={handleSave}
              isDisabled={isButtonDisabled}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
