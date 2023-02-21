import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Card, CardBody, CardFooter, Heading, Image, Stack, Text, Button, ButtonGroup, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import hotel from '../assets/images/hotel.webp'




const RoomTypes = () => {
     const [roomTypes, setRoomTypes] = useState([]);


     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch('http://localhost:5000/room-type');
                    const data = await response.json();
                    setRoomTypes(data.data);
               } catch (error) {
                    console.log('Error fetching room types:', error);
               }
          }

          fetchRoomTypes();
     }, []);

     // const imgUrl = import.meta.env.REACT_APP_API_URL
     const imgUrl = `${import.meta.env.REACT_APP_API_URL}/public/images/room`


     return (
          <div>
               <Sidebar>
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
                              <BreadcrumbLink href='#'>Room Types</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>About</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>

                    <Flex wrap='wrap' justifyContent={'center'}>
                    {roomTypes.map((roomType) => (
                         <Card key={roomType.id} maxW="md" margin={5} >
                              <Image
                                   src={`http://localhost:5000/public/images/room/${roomType.photo}`}
                                   // src={`${imgUrl}/${roomType.photo}`}
                                   alt={roomType.room_type_name}
                                   borderRadius="lg"
                              />
                              <CardBody>
                                   <Stack spacing="3">
                                        <Heading size="md">{roomType.room_type_name}</Heading>
                                        <Text textAlign={'justify'} >{roomType.description}</Text>
                                        <Text color="blue.600" fontSize="2xl" textAlign={'start'}>
                                             ${roomType.price}
                                        </Text>
                                   </Stack>
                              </CardBody>
                              <Divider opacity={0.3} />
                              <CardFooter>
                                   <ButtonGroup spacing="2">
                                        <Button variant="solid" colorScheme="blue">
                                             Book now
                                        </Button>
                                        <Button variant="ghost" colorScheme="blue">
                                             Details
                                        </Button>
                                   </ButtonGroup>
                              </CardFooter>
                         </Card>
                    ))}
                    </Flex>



               </Sidebar>
          </div>
     )
}

export default RoomTypes