import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Image, Stack, Box, Text, Button, ButtonGroup, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormControl, FormLabel, Input, ScaleFade, Textarea, Tooltip, Center } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import { useNavigate } from "react-router-dom"
import BackButton from '../components/atomic/backArrow/BackArrow'
import Head from '../helpers/headTitle';
import withRoleGuard from '../helpers/roleGuard'
import AlertStatus from '../components/atomic/alertStatus/AlertStatus'
import { useRef } from 'react'
import Lottie from "lottie-react";
import successIcon from '../assets/lotties/success.json';
import AlertConfirmation from '../components/atomic/alertConfirmation/alertConfirmation'

const RoomTypesAdd = () => {
     const [roomTypeName, setRoomTypeName] = useState('')
     const [price, setPrice] = useState('')
     const [description, setDescription] = useState('')
     const [facilities, setFacilities] = useState('')
     const [photo, setPhoto] = useState(null)
     const [animation, setAnimation] = useState(false)
     const [roomId, setRoomId] = useState(null)
     const [errMessage, setErrMessage] = useState('')
     const [isOpen, setIsOpen] = useState(false)
     const apiURL = import.meta.env.VITE_API_URL
     const inputRef = useRef(null);
     const navigate = useNavigate()


     const handleFileSelect = (e) => {
          const file = e.target.files[0];
          setErrMessage('')
          setPhoto(file)
     }

     const handleUploadClick = () => {
          inputRef.current.click();
     }

     const handleOpenAlert = () => {
          if (!roomTypeName || !description || !facilities || !photo || !price) {
               setErrMessage('Please Fill all required fields.')
               return
          }
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const addRoomType = async (e) => {
          const formData = new FormData();
          formData.append('room_type_name', roomTypeName)
          formData.append('price', price)
          formData.append('description', description)
          formData.append('photo', photo)
          formData.append('facilities', facilities)
          try {
               const response = await fetch(`${apiURL}/room-type/add`, {
                    method: 'POST',
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
               setRoomId(data.data.id)
          } catch (error) {
               console.log('Error adding room type:', error);
          }
     }

     const style = {
          height: 400,
          width: 400,
     };


     return (
          <Sidebar>
               <Head title='Add Room Types' description={''} />
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
                    <BreadcrumbItem isCurrentPage>
                         <BreadcrumbLink href='#'>Add Room Type</BreadcrumbLink>
                    </BreadcrumbItem>
               </Breadcrumb>

               {animation ?
                    <>
                         <ScaleFade in={animation}>
                              <Flex justifyContent="center" alignItems="center" >
                                   <Lottie animationData={successIcon} autoplay={true} loop={true} style={style} />
                              </Flex>
                              <Text fontSize="24px" fontFamily="monospace" fontWeight="thin">
                                   Success Add Room Type
                              </Text>
                              <ButtonGroup mt={10}>
                                   <Button colorScheme="teal" onClick={() => navigate(`/room-types/${roomId}`)}>
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
                                        value={roomTypeName}
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
                                        value={facilities}
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
                                        value={price}
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
                                        value={description}
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
                                                  <Image src="https://via.placeholder.com/500x300" fallbackSrc="https://via.placeholder.com/500x300" borderRadius={'lg'} />
                                                  <Button mt={5} onClick={handleUploadClick}>
                                                       Upload File
                                                  </Button>
                                             </>
                                        )}
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} ref={inputRef} />
                                   </Flex>
                              </FormControl>

                         </Box>

                         <Center>
                              <Button onClick={handleOpenAlert} colorScheme='blue' width={'40%'}>
                                   Add Room Types
                              </Button>
                         </Center>
                    </Stack>
               }
               <AlertConfirmation
                    isOpen={isOpen}
                    onClose={handleCloseAlert}
                    title={"Confirmation"}
                    message={"Are you sure to add new room type?"}
                    addRoomType={addRoomType}
                    type={'add'}
               />
          </Sidebar>
     )
}

export default withRoleGuard(RoomTypesAdd, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);