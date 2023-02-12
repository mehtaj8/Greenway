import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    Icon,
    Input,
    Spacer,
    VStack,
    Text,
  } from '@chakra-ui/react';  
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import LocationInput from './../Location Input Module/LocationInput';
import CarInput from './../Car Input Module/CarInput';
import TripDetails from './../Trip Details Module/TripDetails';
  
  interface Props {
    onClose: Function;
    isOpen: boolean;
    variant: 'drawer' | 'sidebar';
  }

  
  const SidebarContent = ({ onClick }: { onClick: Function }) => {
    const [x,setX] = useState(true);
    return (
        <>
        {x ?
        <VStack p={5} h ='70vh'>
        <LocationInput/>
        <Spacer/>
        <CarInput/>
        <Spacer/>
        <Button onClick={() => {setX(!x); }} w="100%" bg='#FFBC49' borderRadius='40px' p={5}>
            Evaluate
        </Button>
        </VStack>
        : <VStack p={5} h ='70vh'>
        <LocationInput/>
        <Spacer/>
        <TripDetails/>
        <Spacer/>
        <Button onClick={() => {setX(!x); }} w="100%" bg='#FFBC49' borderRadius='40px' p={5}>
            <ChevronLeftIcon/> Back
        </Button>
        </VStack>
        }
    </>
)
}
  
  const Sidebar = ({ isOpen, variant, onClose }: Props) => {
    return variant === 'sidebar' ? (
      <Box
        position="fixed"
        left={0}
        p={0}
        w="30%"
        top={0}
        h="100%"
        bg="#ffffff"
        boxShadow='2xl'
      >
        <Center
        bg='#FFBC49' 
        color='#000000' 
        h='120px' 
        w='100%' 
        p={4}
        fontSize={32}
        borderBottomEndRadius='20px' >
        <Text>Welcome to <b marginLeft='10px'>GreenWay!</b></Text>
        </Center>
        <SidebarContent onClick={onClose} />
      </Box>
    ) : (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader bg='#FFBC49'><Text>Welcome to <b marginLeft='10px'>GreenWay!</b></Text></DrawerHeader>
            <DrawerBody>
              <SidebarContent onClick={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  export default Sidebar
  