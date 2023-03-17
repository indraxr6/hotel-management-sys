import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Stack, Box, Text, Button, ButtonGroup, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormControl, FormLabel, Input, ScaleFade, Center, Select } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
import BackButton from '../components/atomic/backArrow/BackArrow'
import Head from '../helpers/headTitle';
import withRoleGuard from '../helpers/roleGuard'
import AlertStatus from '../components/atomic/alertStatus/AlertStatus'
import Lottie from "lottie-react";
import successIcon from '../assets/lotties/success.json';
import AlertConfirmation from '../components/atomic/alertConfirmation/alertConfirmation'
import { useEffect } from 'react'

const RoomAdd = () => {
     
     const [roomTypeReq, setRoomTypeReq] = useState("")
     const [roomNumberReq, setRoomNumberReq] = useState("")
     const [roomType, setRoomType] = useState([])
     const [animation, setAnimation] = useState(false)
     const [errMessage, setErrMessage] = useState('')
     const [isOpen, setIsOpen] = useState(false)
     const apiURL = import.meta.env.VITE_API_URL
     const navigate = useNavigate()



     const handleOpenAlert = () => {
          if (!roomNumberReq || !roomTypeReq) {
               setErrMessage('Please Fill all required fields.')
               return
          }
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const goBack = () => {
          setAnimation(false)
          setRoomNumberReq("")
          setRoomTypeReq("")
     }

     const reqData = {
          room_number: parseInt(roomNumberReq),
          id_room_type: parseInt(roomTypeReq)
     }

     const addRoom = async (e) => {
          try {
               const response = await fetch(`${apiURL}/room/add`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqData)
               });
               const data = await response.json();
               if (response.ok) {
                    setAnimation(true)
                   
               } else if (response.status != 200) {
                    setErrMessage(data.message)
               }
          } catch (error) {
               console.log('Error adding room type:', error);
          }
     }

     useEffect(() => {
          async function fetchRoomData() {
               try {
                    const roomTypes = await fetch(`${apiURL}/room-type`)
                    const roomType = await roomTypes.json();
                    setRoomType(roomType.data);
               } catch (error) {
                    console.log("Error fetching room data:", error);
               }
          }
          fetchRoomData();
     }, []);

     const style = {
          height: 400,
          width: 400,
     };


     return (
          <Sidebar>
               <Head title='Add Room' description={''} />
               <Flex h="12" alignItems="flex-start" mx="29px" justifyContent="space-between">
                    <BackButton />
               </Flex>

               <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
                    <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                         Dashboard
                    </Text>
               </Flex>

               <Flex h="20" alignItems="flex-start" mx="29px" justifyContent="space-between">
                    <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                         Add Room 
                    </Text>
               </Flex>

               <Breadcrumb spacing='10px' margin={7} separator={<AiOutlineRight />}>
                    <BreadcrumbItem>
                         <BreadcrumbLink onClick={() => navigate(-1)} href='/dashboard'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem >
                         <BreadcrumbLink onClick={() => navigate(-1)}>Room List</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                         <BreadcrumbLink href='#'>Add Room</BreadcrumbLink>
                    </BreadcrumbItem>
               </Breadcrumb>

               {animation ?
                    <>
                         <ScaleFade in={animation}>
                              <Flex justifyContent="center" alignItems="center" >
                                   <Lottie animationData={successIcon} autoplay={true} loop={true} style={style} />
                              </Flex>
                              <Text fontSize="24px" fontFamily="monospace" fontWeight="thin">
                                   Success Add Room
                              </Text>
                              <ButtonGroup mt={10}>
                                   <Button colorScheme="teal" onClick={() => navigate(`/room-list`)}>
                                        See Result
                                   </Button>
                                   <Button onClick={() => goBack()}>Go Back</Button>
                              </ButtonGroup>
                         </ScaleFade>
                    </>
                    :
                    <Stack spacing={6} margin={7}>
                         <Box borderWidth="1px" p="4" display={'flex'}>
                              <FormControl mr={4}>
                                   <FormLabel>Room Number</FormLabel>
                                   <Input
                                        placeholder="004"
                                        size="md"
                                        type="number"
                                        flex={1}
                                        value={roomNumberReq}
                                        onChange={(e) => setRoomNumberReq(e.target.value)}
                                   />
                              </FormControl>
                              <FormControl mr={4}>
                                   <FormLabel>Room Type</FormLabel>
                                   <Select onChange={(e) => setRoomTypeReq(e.target.value)}>
                                        <option value={""}>--Select Room Type--</option>
                                        {roomType.map((option, index) => {
                                             return (
                                                  <option key={index} value={option.id}>
                                                       {option.room_type_name}
                                                  </option>
                                             );
                                        })}
                                   </Select>
                              </FormControl>
                         </Box>

                         {errMessage ?
                              <ScaleFade in={errMessage}>
                                   <AlertStatus errMessage={errMessage} />
                              </ScaleFade>
                              : null
                         }

                         <Center>
                              <Button onClick={handleOpenAlert} colorScheme='blue' width={'25%'}>
                                   Add Room
                              </Button>
                         </Center>
                    </Stack>
               }
               <AlertConfirmation
                    isOpen={isOpen}
                    onClose={handleCloseAlert}
                    title={"Confirmation"}
                    message={"Are you sure to add new room?"}
                    addRoom={addRoom}
                    type={'add'}
               />
          </Sidebar>
     )
}

export default withRoleGuard(RoomAdd, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);