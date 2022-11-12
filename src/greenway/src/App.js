import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MapContainer from './Components/MapAPI/MapApi'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <MapContainer />
    </ChakraProvider>
  );
}

export default App;