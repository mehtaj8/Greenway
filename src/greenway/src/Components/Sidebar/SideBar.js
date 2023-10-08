import {
  Box,
  Button,
  Center,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import LocationInput from './../Location Input Module/LocationInput';
import CarInput from './../Car Input Module/CarInput';
import TripDetails from './../Trip Details Module/TripDetails';


const SidebarContent = (props) => {
  const [x, setX] = useState(true);
  const [startLoc, setStartLoc] = useState(0);
  const [endLoc, setEndLoc] = useState(0);
  const [mileage, setMileage] = useState(0);

  useEffect(() => { props.updateStart(startLoc) }, [startLoc]);
  useEffect(() => { props.updateEnd(endLoc) }, [endLoc]);

  return (
    <>
      {x ?
        <VStack p={5} h='70vh'>
          <LocationInput fromChangeFunction={(event) => { setStartLoc(event.target.value) }} ToChangeFunction={(event) => { setEndLoc(event.target.value) }} />
          <Spacer />
          <CarInput setMileage={setMileage} />
          <Spacer />
          <Button onClick={() => { setX(!x); props.evalFunc(mileage); }} w="100%" bg='#29e694' borderRadius='40px' p={5}>
            Evaluate
          </Button>
        </VStack>
        : <VStack p={5} h='70vh'>
          <LocationInput fromChangeFunction={(event) => { setStartLoc(event.target.value) }} ToChangeFunction={(event) => { setEndLoc(event.target.value) }} />
          <Spacer />
          <TripDetails Mileage={mileage} GasPrice={props.GasPrice} Distance={props.Distance} TotalPrice={props.TotalPrice} />
          <Spacer />
          <Button onClick={() => { setX(!x); }} w="100%" bg='#29e694' borderRadius='40px' p={5}>
            <ChevronLeftIcon /> Back
          </Button>
        </VStack>
      }
    </>
  )
}

const Sidebar = (props) => {
  return (
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
        bg='#29e694'
        color='#000000'
        h='120px'
        w='100%'
        p={4}
        fontSize={32}
        borderBottomEndRadius='20px' >
        <Text>Welcome to <b marginLeft='10px'>Greenway!</b></Text>
      </Center>
      <SidebarContent Mileage={props.Mileage} GasPrice={props.GasPrice} Distance={props.Distance} TotalPrice={props.TotalPrice} evalFunc={props.evalFunc} updateStart={props.updateStart} updateEnd={props.updateEnd} onClick={props.onClose} />
    </Box>
  )
  // : (
  //   <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
  //     <DrawerOverlay>
  //       <DrawerContent>
  //         <DrawerCloseButton />
  //         <DrawerHeader bg='#FFBC49'><Text>Welcome to <b marginLeft='10px'>GreenWay!</b></Text></DrawerHeader>
  //         <DrawerBody>
  //           <SidebarContent onClick={onClose} />
  //         </DrawerBody>
  //       </DrawerContent>
  //     </DrawerOverlay>
  //   </Drawer>
  // )
}

export default Sidebar
