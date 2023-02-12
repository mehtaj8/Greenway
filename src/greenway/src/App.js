import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MapModule from './Components/MapAPI/MapModule';
import Navigation from './Components/Navigation Module/Navigation';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MapModule/>
    </ChakraProvider>
  );
}

export default App;