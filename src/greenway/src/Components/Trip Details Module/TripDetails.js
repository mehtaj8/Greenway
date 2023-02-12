import {
    Box,
    Button,
    Center,
    Container,
    Grid,
    GridItem,
    Icon,
    Input,
    Select,
    VStack,
    Text,
  } from '@chakra-ui/react';  

const TripDetails = () => {
return (
    <>
    <Text color='585858' fontSize='20px' textAlign='left' w='100%'>Trip Details</Text>
    <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
        <VStack p={5}>
            <Text w='100%' textAlign='left'>Mileage:</Text>
            <Text w='100%' textAlign='left'>Gas Prices:</Text>
            <Text w='100%' textAlign='left'>Distance:</Text>
            <Text w='100%' textAlign='left'>Total price of trip:</Text>
        </VStack>
    </Box>
    </>)
}

export default TripDetails;