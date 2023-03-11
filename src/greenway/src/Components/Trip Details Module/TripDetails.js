import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';

const TripDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 12000);
  }, []);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  return (
    <>
      <Text color='585858' fontSize='20px' textAlign='left' w='100%'>Trip Details</Text>
      <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
          <VStack p={5}>
              <Text w='100%' textAlign='left'>Mileage: {props.Mileage} L/100 km</Text>
              <Text w='100%' textAlign='left'>Gas Prices: ${props.GasPrice.toFixed(2)}</Text>
              <Text w='100%' textAlign='left'>Distance: {props.Distance/1000} km</Text>
              <Text w='100%' textAlign='left'>Total price of trip: ${props.TotalPrice}</Text>
          </VStack>
      </Box>
    </>
  )
}

export default TripDetails;
