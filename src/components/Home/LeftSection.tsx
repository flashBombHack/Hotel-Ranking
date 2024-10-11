// src/components/LeftSection.tsx
import {
  Box,
  useColorMode,
  Text,
  Divider,
  Checkbox,
  Flex,
  Button,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface LeftSectionProps {
  onFilterChange: (selectedBrands: string[]) => void; 
  onPriceChange: (minPrice: number, maxPrice: number) => void; 
}


const LeftSection = ({ onFilterChange, onPriceChange }: LeftSectionProps) => {
  const { colorMode } = useColorMode();
  const [brands, setBrands] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  // const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(0);  
  const [maxPrice, setMaxPrice] = useState(101); 
  const [tooltipOpen, setTooltipOpen] = useState<number | null>(null);

  // Fetch brands from local storage
  useEffect(() => {
    const storedBrands = JSON.parse(localStorage.getItem('brands') || '[]');
    setBrands(storedBrands);
  }, []);

  useEffect(() => {
    onFilterChange(checkedItems);
    onPriceChange(minPrice, maxPrice);
  }, [checkedItems, minPrice, maxPrice, onFilterChange, onPriceChange]);

  const handleCheckboxChange = (brand: string) => {
    if (checkedItems.includes(brand)) {
      setCheckedItems(checkedItems.filter((item) => item !== brand));
    } else {
      setCheckedItems([...checkedItems, brand]);
    }
  };

  const resetAll = () => {
    setCheckedItems([]);
    setMinPrice(0);
    setMaxPrice(101);
  };

  const handleMinPriceChange = (val: number) => {
    setMinPrice(val);
  };

  const handleMaxPriceChange = (val: number) => {
    setMaxPrice(val);
  };

  return (
    <Box
      width="250px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="lg"
      boxShadow="md"
      p={4}
      mt={4}
      height="500px"
    >
      {/* Top Segment */}
      <Box mb={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="14px" fontWeight="bold">
            Filter
          </Text>
          <Button fontSize="13px" variant="link" onClick={resetAll} colorScheme="orange">
            Reset All
          </Button>
        </Flex>
        <Divider my={2} borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)'} />
      </Box>

     
      <Text fontSize="13px" fontWeight="bold" mb={2}>
        Brands
      </Text>

      <Box
        height="200px" 
        overflowY="auto"
        borderRadius="md"
        fontSize="8px"
        p={2}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'light' ? 'orange.400' : 'orange.600',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: colorMode === 'light' ? 'gray.100' : 'gray.700',
          },
        }}
      >
        {brands.length > 0 ? (
          <VStack spacing={3} align="flex-start">
            {brands.map((brand) => (
              <Checkbox
                key={brand}
                isChecked={checkedItems.includes(brand)}
                onChange={() => handleCheckboxChange(brand)}
                colorScheme="orange"
                fontSize="12px"
              >
                <Text fontSize="12px" color={colorMode === 'light' ? 'black' : 'white'}>
                  {brand}
                </Text>
              </Checkbox>
            ))}
          </VStack>
        ) : (
          <Text fontSize="12px" color={colorMode === 'light' ? 'gray.600' : 'gray.400'} textAlign="center">
            No record available
          </Text>
        )}
      </Box>

    
      <Divider my={4} borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)'} />
      <Text fontSize="13px" fontWeight="bold" mb={2}>
        Price
      </Text>

      <HStack justify="space-between" mb={4}>
        <Box
          borderWidth={1}
          borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
          borderRadius="md"
          p={2}
          width="45%"
          fontSize="12px"
          textAlign="center"
          bg={colorMode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)'}
        >
          From: ${minPrice}
        </Box>
        <Text mx={2}>-</Text>
        <Box
          borderWidth={1}
          borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
          borderRadius="md"
          p={2}
          width="45%"
          fontSize="12px"
          textAlign="center"
          bg={colorMode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)'}
        >
          Up to: ${maxPrice}
        </Box>
      </HStack>

     
      <Slider
        aria-label="Price Range Min"
        min={0}
        max={100}
        step={1}
        value={minPrice}
        onChange={handleMinPriceChange}
        onMouseEnter={() => setTooltipOpen(0)}
        onMouseLeave={() => setTooltipOpen(null)}
        mb={4}
      >
        <SliderTrack bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
          <SliderFilledTrack bg="orange.400" />
        </SliderTrack>
        <SliderThumb
          onMouseEnter={() => setTooltipOpen(0)}
          onMouseLeave={() => setTooltipOpen(null)}
        >
          <Tooltip
            hasArrow
            bg="orange.400"
            color="white"
            placement="top"
            isOpen={tooltipOpen === 0}
            label={`$${minPrice}`}
          >
            <Box />
          </Tooltip>
        </SliderThumb>
      </Slider>

      <Slider
        aria-label="Price Range Max"
        min={101}
        max={1000}
        step={1}
        value={maxPrice}
        onChange={handleMaxPriceChange}
        onMouseEnter={() => setTooltipOpen(1)}
        onMouseLeave={() => setTooltipOpen(null)}
      >
        <SliderTrack bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
          <SliderFilledTrack bg="orange.400" />
        </SliderTrack>
        <SliderThumb
          onMouseEnter={() => setTooltipOpen(1)}
          onMouseLeave={() => setTooltipOpen(null)}
        >
          <Tooltip
            hasArrow
            bg="orange.400"
            color="white"
            placement="top"
            isOpen={tooltipOpen === 1}
            label={`$${maxPrice}`}
          >
            <Box />
          </Tooltip>
        </SliderThumb>
      </Slider>
    </Box>
  );
};

export default LeftSection;
