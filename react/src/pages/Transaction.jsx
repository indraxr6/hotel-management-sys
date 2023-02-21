import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Stats from '../components/atomic/stats/Stats'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Text } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'

const Transaction = () => {
     
     useEffect(() => {
          async function fetchRoomData() {
               try {
                    const [roomsResponse, roomTypesResponse] = await Promise.all([
                         fetch(`${apiURL}/room`),
                         fetch(`${apiURL}/room-type`),
                    ]);
                    const rooms = await roomsResponse.json();
                    const roomTypes = await roomTypesResponse.json();
                    setRoomList(rooms.data);
                    setRoomType(roomTypes.data);
               } catch (error) {
                    console.log("Error fetching room data:", error);
               }
          }
          fetchRoomData();
     }, []);

     return (
          <div>
               <Sidebar>
                    <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
                         <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                              Dashboard
                         </Text>
                    </Flex>

                    <Flex h="20" alignItems="flex-start" mx="7" justifyContent="space-between">
                         <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                              Transactions
                         </Text>
                    </Flex>

                    <Stats />
                    
                    <Breadcrumb spacing='10px' margin={6} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>Transaction</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>About</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>
                    <br />

                   

               </Sidebar>
          </div>
     )
}

export default Transaction