// src/App.tsx
import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './components/Home/Home';
import theme from './theme'; 

function App() {
  return (
    <ChakraProvider theme={theme}>
     
      <Box
        p="10px"
        minH="100vh"
        minW="30vw"
        backgroundColor="rgb(253, 253, 253)" 
        _dark={{ backgroundColor: 'gray.900' }}
      >
        <Header />
        <Home />
      </Box>
    </ChakraProvider>
  );
}

export default App;
