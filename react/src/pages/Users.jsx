import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Card, CardBody, CardFooter, Heading, Image, Stack, Text, Button, ButtonGroup, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import hotel from '../assets/images/hotel.webp'




const Users = () => {
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
                              User Data
                         </Text>
                    </Flex>



                    <Breadcrumb spacing='10px' margin={7} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>Users</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>About</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>

               
               </Sidebar>
          </div>
     )
}

export default Users