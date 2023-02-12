import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MapContainer from './Components/MapAPI/MapApi';
import Navigation from './Components/Navigation Module/Navigation';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navigation/>
    </ChakraProvider>
  );
}

export default App;