import {
    Box,
    Input,
    Select,
    VStack,
    Text,
    Icon,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai'

// const CircleIcon = (props) => (
// <Icon viewBox='0 0 200 200' {...props}>
//     <path
//     fill='none'
//     d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
//     stroke="currentColor" stroke-width="20px"
//     />
// </Icon>
// )

export default function CarInput(props) {
    const [yearSelectActive, setYearSelectActive] = useState(true);
    const [makeSelectActive, setMakeSelectActive] = useState(true);
    const [modelSelectActive, setModelSelectActive] = useState(true);
    const [yearsList, setYearsList] = useState([]);
    const [makesList, setMakesList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [selectedYear, setSelectedYear] = useState();
    const [selectedMake, setSelectedMake] = useState();
    const [selectedModel, setSelectedModel] = useState();
    const [manualMileageDisable, setManualMileageDisable] = useState(false);
    const [mileage, setMileage] = useState(0);

    const getYears = async () => {
        await axios.get("http://localhost:3001/db/cardata/years").then((response, error) => {
            setYearsList(response.data);
        });
    }

    const getMakes = async () => {
        await axios.get("http://localhost:3001/db/cardata/makes/" + selectedYear).then((response, error) => {
            setMakesList(response.data);
        });
    }

    const getModels = async () => {
        await axios.get("http://localhost:3001/db/cardata/models/" + selectedYear + "/" + selectedMake).then((response, error) => {
            setModelList(response.data);
        });
    }

    const getMileage = async () => {
        await axios.get("http://localhost:3001/db/cardata/getMilage/" + selectedYear + "/" + selectedMake + "/" + selectedModel).then((response, error) => {
            if (response.data.length > 1) {
                setMileage((response.data[0] + response.data[1]) / 2);
            } else {
                setMileage(response.data[0]);
            }

            //console.log(response.data);
        });
    }

    const setManualMileage = (event) => {
        setYearSelectActive(true);
        setMileage(event.target.value);
    }

    const handleSelect = (event) => {
        //console.log(event.target.id)
        if (event.target.id === 'year') {
            if (event.target.value !== 'Select Year') {
                setSelectedYear(event.target.value);
                setManualMileageDisable(true);
            }
        } else if (event.target.id === 'make') {
            if (event.target.value !== 'Select Make')
                setSelectedMake(event.target.value);
        } else if (event.target.id === 'model') {
            if (event.target.value !== 'Select Model')
                setSelectedModel(event.target.value);
        }
    }

    function isNumeric(str) {
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    useEffect(() => {
        if (mileage !== 0 && isNumeric(mileage)) {
            //console.log(mileage);
            props.setMileage(parseFloat(mileage));
        }
    }, [mileage]);

    useEffect(() => {
        if (selectedModel != null)
            getMileage();
    }, [selectedModel]);

    useEffect(() => {
        if (selectedYear != null)
            getMakes();
    }, [selectedYear]);

    useEffect(() => {
        if (selectedMake != null)
            getModels();
    }, [selectedMake]);

    useEffect(() => {
        setYearSelectActive(false);
    }, [yearsList]);

    useEffect(() => {
        //console.log(makesList);
        if (makesList.length > 0) {
            setMakeSelectActive(false);
        }
    }, [makesList]);

    useEffect(() => {
        if (modelList.length > 0) {
            //console.log(modelList);
            setModelSelectActive(false);
        }
    }, [modelList]);

    useEffect(() => {
        getYears();
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack p={5}>
                <Text color='585858' fontSize='20px' textAlign='left' w='100%'>Select Your Vehicle</Text>
                <Icon as={AiOutlineQuestionCircle} color='#29e694' boxSize='20px' onClick={onOpen}></Icon>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Car Information Input Help</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        <b>Option 1:</b><br></br>
                        Enter <b>Year</b>, <b>Make</b> and <b>Model</b> of the car you use, the gas mileage will be collected automatically.<br></br>
                        <br></br>
                        <b>Option 2:</b><br></br>
                        Enter your vehicles gas mileage in the input box.<br></br>
                        <br></br>
                        Press <b>Evaluate</b> once done
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box border='2px' borderColor='#A5A5A5' borderRadius='20px' w='100%'>
                <VStack p={5}>
                    <Select id='year' variant='outline' placeholder='Select Year' borderRadius={"36px"} isDisabled={yearSelectActive} onChange={handleSelect}>
                        {
                            yearsList.map(item =>
                                <option borderRadius={"36px"} value={item}>{item}</option>
                            )
                        }
                    </Select>
                    <Select id='make' variant='outline' placeholder='Select Make' borderRadius={"36px"} isDisabled={makeSelectActive} onChange={handleSelect}>
                        {
                            makesList.map(item =>
                                <option value={item}>{item}</option>
                            )
                        }
                    </Select>
                    <Select id='model' variant='outline' placeholder='Select Model' borderRadius={"36px"} isDisabled={modelSelectActive} onChange={handleSelect}>
                        {
                            modelList.map(item =>
                                <option value={item}>{item}</option>
                            )
                        }
                    </Select>
                    <Text>OR</Text>
                    <Input variant='outline' placeholder='Enter Your Vehicle Mileage' borderRadius={"36px"} isDisabled={manualMileageDisable} onChange={setManualMileage} />
                </VStack>
            </Box>
        </>
    )
}