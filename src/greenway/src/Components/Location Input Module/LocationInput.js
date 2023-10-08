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
    HStack,
    extendTheme,
    Stat,
    StatLabel,
    StatHelpText,
    Collapse,
    CloseButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';

import { AiOutlineQuestionCircle } from 'react-icons/ai'

var placesServices;

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
        <path
            fill='none'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            stroke="currentColor" stroke-width="20px"
        />
    </Icon>
)

export default function LocationInput(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    var placesServices = props.placesServices;

    const inputFrom = document.getElementById("from")
    const inputTo = document.getElementById("to")

    return (
        <>
            <HStack p={5}>
                <Text color='#585858' fontSize='20px' textAlign='left' w='100%'>Set Your Destination</Text>
                <Icon as={AiOutlineQuestionCircle} color='#29e694' boxSize='20px' onClick={onOpen}></Icon>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Location Input Help</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        Please enter the starting location in the <b>My Location</b> box. <br></br>
                        <br></br>
                        Please enter the ending location in the <b>Destination Location</b> box.
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
                <VStack p={5}>
                    <Grid templateColumns='repeat(6,1fr)' w='100%'>
                        <GridItem colSpan={1}>
                            <CircleIcon boxSize={8} color='#5A00CC' />
                        </GridItem>
                        <GridItem colSpan={5}>
                            <Text fontSize='15px' color='#A5A5A5'>From</Text>
                            <Input id='from' variant='flushed' placeholder='My Location' onChange={props.fromChangeFunction} />
                        </GridItem>
                    </Grid>
                    <Grid templateColumns='repeat(6,1fr)' w='100%'>
                        <GridItem colSpan={1}>
                            <CircleIcon boxSize={8} color='red.500' />
                        </GridItem>
                        <GridItem colSpan={5}>
                            <Text fontSize='15px' color='#A5A5A5'>To</Text>
                            <Input id='to' variant='flushed' placeholder='Destination Location' onChange={props.ToChangeFunction} />
                        </GridItem>
                    </Grid>
                </VStack>
            </Box>
        </>
    );
}