// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Poppins', sans-serif",
      },
    },
  },
});

export default theme;
