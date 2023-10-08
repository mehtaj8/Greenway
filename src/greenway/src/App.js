import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MapModule from './Components/MapAPI/MapModule';

class App extends React.Component {
  componentDidMount() {
    const container = document.getElementById('root');
    container.getElementsByClassName("chakra-button css-1ucqnh2").item(0).remove();
  }

  render() {
    return (
      <ChakraProvider theme={theme}>
        <MapModule />
      </ChakraProvider>
    );
  }
}

export default App;