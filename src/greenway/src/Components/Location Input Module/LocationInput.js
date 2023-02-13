import {
    Box,
    Button,
    Center,
    Container,
    Grid,
    GridItem,
    Icon,
    Input,
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

export default function LocationInput (props) {
    return (
        <>
            <Text color='585858' fontSize='20px' textAlign='left' w='100%'>Set your destination</Text>
            <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
                <VStack p={5}>
                    <Grid templateColumns='repeat(6,1fr)' w ='100%'>
                        <GridItem colSpan={1}>
                            <CircleIcon boxSize={8} color='#5A00CC' />
                        </GridItem>
                        <GridItem colSpan={5}>
                            <Text fontSize='15px' color='#A5A5A5'>From</Text>
                            <Input variant='flushed' placeholder='My location' onChange={props.fromChangeFunction}/>
                        </GridItem>
                    </Grid>
                    <Grid templateColumns='repeat(6,1fr)' w ='100%'>
                        <GridItem colSpan={1}>
                            <CircleIcon boxSize={8} color='red.500' />
                        </GridItem>
                        <GridItem colSpan={5}> 
                            <Text fontSize='15px' color='#A5A5A5'>To</Text>
                            <Input variant='flushed' placeholder='Destination location' onChange={props.ToChangeFunction}/>
                        </GridItem>
                    </Grid>
                </VStack>
            </Box>
        </>
    );
}