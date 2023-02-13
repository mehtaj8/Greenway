import { useState,useEffect } from 'react'
import { Box, Container, useBreakpointValue } from '@chakra-ui/react'

import Sidebar from './../Sidebar/SideBar';
import Header from './../Header/Header';
import MapModule from './../MapAPI/MapModule';

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export default function Navigation(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [startLoc, setStartLoc] = useState(0);
  const [endLoc, setEndLoc] = useState(0);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  useEffect(()=>{
    props.updateStart(startLoc);
  },[startLoc]);
  useEffect(()=>{
    props.updateEnd(endLoc);
  },[endLoc]);

  return (
    <>
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        updateEnd={(val) => {setEndLoc(val)}}
        updateStart={(val) => {setStartLoc(val)}}
        evalFunc={props.evalFunc}
        Mileage={props.Mileage} 
        GasPrice={props.GasPrice} 
        Distance={props.Distance} 
        TotalPrice={props.TotalPrice}
      />
      <Box ml={!variants?.navigationButton && 200}>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
      </Box>
    </>
  )
}
