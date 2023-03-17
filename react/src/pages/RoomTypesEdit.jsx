import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Image, Stack, Box, Text, Button, ButtonGroup, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormControl, FormLabel, Input, ScaleFade, Textarea, Tooltip, Center } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom"
import BackButton from '../components/atomic/backArrow/BackArrow'
import Head from '../helpers/headTitle';
import withRoleGuard from '../helpers/roleGuard'
import AlertStatus from '../components/atomic/alertStatus/AlertStatus'
import { useRef } from 'react'
import Lottie from "lottie-react";
import successIcon from '../assets/lotties/success.json';
import AlertConfirmation from '../components/atomic/alertConfirmation/alertConfirmation'
import { useEffect } from 'react'

const RoomTypesEdit = () => {
     const [roomDetails, setRoomDetails] = useState([])
     const [roomFacilities, setRoomFacilities] = useState([])
     const [roomTypeName, setRoomTypeName] = useState(roomDetails.room_type_name)
     const [price, setPrice] = useState(roomDetails.price)
     const [description, setDescription] = useState(roomDetails.description)
     const [photo, setPhoto] = useState(roomDetails.photo)
     const [facilities, setFacilities] = useState(roomFacilities)
     const [animation, setAnimation] = useState(false)
     const [errMessage, setErrMessage] = useState('')
     const [isOpen, setIsOpen] = useState(false)
     const apiURL = import.meta.env.VITE_API_URL
     const inputRef = useRef(null);
     const navigate = useNavigate()
     const { id } = useParams()

     const handleFileSelect = (e) => {
          const file = e.target.files[0];
          setErrMessage('')
          setPhoto(file)
     }

     const handleUploadClick = () => {
          inputRef.current.click();
     }

     const handleOpenAlert = () => {
          if (!roomTypeName || !description || !facilities  || !price) {
               setErrMessage('Please Fill all required fields.')
               return
          }
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const editRoomType = async (e) => {
          const formData = new FormData();
          formData.append('room_type_name', roomTypeName)
          formData.append('price', price)
          formData.append('description', description)
          formData.append('photo', photo)
          formData.append('facilities', facilities)
          try {
               const response = await fetch(`${apiURL}/room-type/edit/${id}`, {
                    method: 'PUT',
                    body: formData
               });
               const data = await response.json();
               if (response.ok) {
                    setAnimation(true)
                    setDescription('')
                    setFacilities('')
                    setRoomTypeName('')
                    setPrice('')
                    setPhoto(null)
               } else if (response.status != 200) {
                    setErrMessage(data.message)
               }
          } catch (error) {
               console.log('Error adding room type:', error);
          }
     }

     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch(`${apiURL}/room-type/${id}`);
                    const data = await response.json();
                    if (!response.ok) {
                         navigate("/notfound")
                    }
                    setRoomDetails(data.data);
                    setRoomFacilities(data.facilities);
                    setRoomTypeName(data.data.room_type_name);
                    setPrice(data.data.price);
                    setDescription(data.data.description);
                    setFacilities(data.facilities);
               } catch (error) {
                    console.log('Error fetching room type data:', error);
               }
          }
          fetchRoomTypes();
     }, []);

     const style = {
          height: 400,
          width: 400,
     };


     return (
          <Sidebar>
               <Head title={`Edit ${roomDetails.room_type_name}`} description={''} />
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
                         Room Types
                    </Text>
               </Flex>

               <Breadcrumb spacing='10px' margin={7} separator={<AiOutlineRight />}>
                    <BreadcrumbItem>
                         <BreadcrumbLink onClick={() => navigate(-1)} href='/dashboard'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem >
                         <BreadcrumbLink onClick={() => navigate(-1)}>Room Types</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem >
                         <BreadcrumbLink onClick={() => navigate(-1)}>{roomDetails.room_type_name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                         <BreadcrumbLink href='#'>Edit Room Type</BreadcrumbLink>
                    </BreadcrumbItem>
               </Breadcrumb>

               {animation ?
                    <>
                         <ScaleFade in={animation}>
                              <Flex justifyContent="center" alignItems="center" >
                                   <Lottie animationData={successIcon} autoplay={true} loop={true} style={style} />
                              </Flex>
                              <Text fontSize="24px" fontFamily="monospace" fontWeight="thin">
                                   Success Edit Room Type Data
                              </Text>
                              <ButtonGroup mt={10}>
                                   <Button colorScheme="teal" onClick={() => navigate(`/room-types/${id}`)}>
                                        See Result
                                   </Button>
                                   <Button onClick={() => setAnimation(false)}>Go Back</Button>
                              </ButtonGroup>
                         </ScaleFade>
                    </>
                    :
                    <Stack spacing={6} margin={7}>
                         <Box borderWidth="1px" p="4" display={'flex'}>
                              <FormControl mr={4}>
                                   <FormLabel>Room Type Name</FormLabel>
                                   <Input
                                        placeholder="VIP Room"
                                        size="md"
                                        type="text"
                                        flex={1}
                                        // defaultValue={roomDetails.room_type_name}
                                        defaultValue={roomTypeName}
                                        onChange={(e) => setRoomTypeName(e.target.value)}
                                   />
                              </FormControl>
                              <FormControl mr={4}>
                                   <FormLabel>Facilities</FormLabel>
                                   <Input
                                        placeholder="Wi-fi, restroom, TV"
                                        size="md"
                                        type="text"
                                        flex={1}
                                        defaultValue={roomFacilities}
                                        onChange={(e) => setFacilities(e.target.value)}
                                   />
                              </FormControl>
                              <FormControl mr={4}>
                                   <FormLabel>Price</FormLabel>
                                   <Input
                                        placeholder="$100"
                                        size="md"
                                        type="number"
                                        flex={1}
                                        // defaultValue={roomDetails.price}
                                        defaultValue={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                   />
                              </FormControl>
                         </Box>

                         <Box borderWidth="1px" p="4" display={'flex'}>
                              <FormControl mr={4}>
                                   <FormLabel>Description</FormLabel>
                                   <Textarea
                                        placeholder="VIP Room"
                                        size="md"
                                        type="text"
                                        flex={0}
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                   />
                              </FormControl>
                         </Box>
                         {errMessage ?
                              <ScaleFade in={errMessage}>
                                   <AlertStatus errMessage={errMessage} />
                              </ScaleFade>
                              : null
                         }

                         <Box borderWidth="1px" p="4" display="center">
                              <FormControl mr={4}>
                                   <FormLabel>Upload Room Image</FormLabel>
                                   <Flex direction="column" justifyContent="center" alignItems="center" mt={10}>
                                        {photo ? (
                                             <>
                                                  <Tooltip hasArrow label="Preview Image">
                                                       <Image src={URL.createObjectURL(photo)} borderRadius={'lg'} maxH="600px" maxW="600px" objectFit="contain" />
                                                  </Tooltip>
                                                  <Button mt={5} onClick={() => handleUploadClick()}>
                                                       Change Image
                                                  </Button>
                                             </>
                                        ) : (
                                             <>
                                                  <Image src={`${apiURL}/images/room/${roomDetails.photo}`} maxH="600px" maxW="600px" objectFit="contain" borderRadius={'lg'} />
                                                  <Button mt={5} onClick={handleUploadClick}>
                                                       Change Image
                                                  </Button>
                                             </>
                                        )}
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} ref={inputRef} />
                                   </Flex>
                              </FormControl>

                         </Box>

                         <Center>
                              <Button onClick={handleOpenAlert} colorScheme='blue' width={'40%'}>
                                   Confirm Edit
                              </Button>
                         </Center>
                    </Stack>
               }
               <AlertConfirmation
                    isOpen={isOpen}
                    onClose={handleCloseAlert}
                    title={"Confirmation"}
                    message={"Are you sure to change this room type information?"}
                    editRoomType={editRoomType}
                    type={'add'}
               />
          </Sidebar>
     )
}

export default withRoleGuard(RoomTypesEdit, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);