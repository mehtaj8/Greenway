/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    Wrap,
    WrapItem,
    Center,
} from '@chakra-ui/react'

class CarContainer extends Component {
    render() {
        return (
            <Wrap>
                <WrapItem>
                    <Center
                        p={4}
                        borderRadius='lg'
                        m={4}
                        bgColor='white'
                        shadow='base'
                        minW='container.sm'
                        zIndex='1'
                        marginBottom='20vw'
                    >
                        <HStack spacing={2} justifyContent='space-between'>
                            <Box flexGrow={1}>
                                <Input id='start' type='text' placeholder='Origin' />
                            </Box>
                            <Box flexGrow={1}>
                                <Input id='end' type='text' placeholder='Destination' />
                            </Box>
                            <ButtonGroup>
                                <Button colorScheme='blue' type='submit'>
                                    Calculate Route
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    </Center>
                </WrapItem>
            </Wrap>
        );
    }
}

export default CarContainer;