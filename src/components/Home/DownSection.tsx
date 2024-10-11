import { Flex } from '@chakra-ui/react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import { useState } from 'react';

interface Filters {
  brand: string;
  location: string;
}

const DownSection = ({ filters }: { filters: Filters }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleFilterChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <Flex>
     
      <LeftSection onFilterChange={handleFilterChange} onPriceChange={handlePriceChange} />
      
   
      <RightSection 
        selectedBrands={selectedBrands} 
        minPrice={minPrice} 
        maxPrice={maxPrice} 
        filters={filters} 
      />
    </Flex>
  );
};

export default DownSection;