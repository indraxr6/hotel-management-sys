import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Stats from '../components/atomic/stats/Stats'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, TableContainer, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Text } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import format from '../helpers/dateFormat'

const Dashboard = () => {
     const [order, setOrder] = useState([])
     

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const res = await fetch('http://localhost:5000/order/find')
                    // const res = await fetch('https://fakestoreapi.com/products')
                    const data = await res.json()
                    setOrder(data.transactionData)
               } catch (error) {
                    console.error(error)
               }
          }
          fetchData()
     }, [])
     
     
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
                              Home
                         </Text>
                    </Flex>

                    <Stats />

                    <Breadcrumb spacing='10px' margin={6} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href='#'>About</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>
                    <br />
                    <Text fontSize="xl" fontWeight="Thin">10 latest transaction</Text>
                    <br />
                    <TableContainer>
                         <Table variant='striped' colorScheme='teal'>
                              <TableCaption>Imperial to metric conversion factors</TableCaption>
                              <Thead>
                                   <Tr>
                                        <Th>Order Number</Th>
                                        <Th>Order Name</Th>
                                        <Th>Order Date</Th>
                                        <Th>Order Email</Th>
                                        <Th>Status</Th>
                                        <Th>Check-In Date</Th>
                                        <Th>Action</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {order.map((tb, index) => {
                                        
                                        console.log(order)
                                        return (
                                             <Tr key={index}>
                                                  <Td>{tb.order_number}</Td>
                                                  <Td>{tb.order_name}</Td>
                                                  <Td>{format.formatDateWithTime(tb.order_date)}</Td>
                                                  <Td>{tb.order_email}</Td>
                                                  <Td>{tb.order_status}</Td>
                                                  <Td>{format.formatDate(tb.checkin_date)}</Td>
                                                  <Td>
                                                       <Button variant={"outline"} size="sm">Details</Button>
                                                  </Td>
                                             </Tr>
                                        )
                                   })}
                              </Tbody>
                         </Table>
                    </TableContainer>

               </Sidebar>
          </div>
     )
}

export default Dashboard