import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Center,
  Spinner,
  HStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import { AiOutlineQuestionCircle } from 'react-icons/ai'

const TripDetails = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 12000);
  }, []);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="#29e694" />
      </Center>
    );
  }

  return (
    <>
      <HStack>
        <Text color='#585858' fontSize='20px' textAlign='left' w='100%'>Trip Details</Text>
        <Icon as={AiOutlineQuestionCircle} color='#29e694' boxSize='20px' onClick={onOpen}></Icon>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Location Input Help</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            Our calculations for the total price of the trip was done based on average gas prices along the route of the trip. <br></br>
            <br></br>
            The calculation include detailed fuel consumption on different elevations, i.e. lower fuel usage on down slope.<br></br>
            <br></br>
            The shortest and most Eco-Friendly route was chosen for the trip that would result in the lowest cost for our customers.<br></br>
            <br></br>
            Read more about the ways our application reduces your carbon footprint and evalutes your trip cost:<br></br>
            <a href='https://github.com/mehtaj8/Greenway/blob/main/docs/Design/SystDesign/SystDes.pdf' target={'_blank'} style={{ color: 'blue' }}>Here</a>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
        <VStack p={5}>
          <Text w='100%' textAlign='left'>Mileage: {props.Mileage} L/100 km</Text>
          <Text w='100%' textAlign='left'>Gas Prices: ${props.GasPrice.toFixed(2)}</Text>
          <Text w='100%' textAlign='left'>Distance: {props.Distance / 1000} km</Text>
          <Text w='100%' textAlign='left'>Total price of trip: ${props.TotalPrice}</Text>
        </VStack>
      </Box>
    </>
  )
}

export default TripDetails;
