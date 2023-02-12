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

const CircleIcon = (props) => (
<Icon viewBox='0 0 200 200' {...props}>
    <path
    fill='none'
    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    stroke="currentColor" stroke-width="20px"
    />
</Icon>
)

const CarInput = () => {
return (
    <>
    <Text color='585858' fontSize='20px' textAlign='left' w='100%'>Select your Vehicle</Text>
    <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
        <VStack p={5}>
            <Select variant='outline' placeholder='Make'/>
            <Select variant='outline' placeholder='Model'/>
            <Select variant='outline' placeholder='Year'/>
            <Text>OR</Text>
            <Input variant='outline' placeholder='Enter your vehicle mileage'/>
        </VStack>
    </Box>
    </>)
}

export default CarInput;