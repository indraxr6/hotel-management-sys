import React, { useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Stats from '../components/atomic/stats/Stats'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Text } from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'

const Transaction = () => {

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

                    <TableContainer>
                         <Table variant='striped' colorScheme='teal'>
                              <TableCaption>Imperial to metric conversion factors</TableCaption>
                              <Thead>
                                   <Tr>
                                        <Th>To convert</Th>
                                        <Th>into</Th>
                                        <Th isNumeric>multiply by</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   <Tr>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td isNumeric>25.4</Td>
                                   </Tr>
                                   <Tr>
                                        <Td>feet</Td>
                                        <Td>centimetres (cm)</Td>
                                        <Td isNumeric>30.48</Td>
                                   </Tr>
                                   <Tr>
                                        <Td>yards</Td>
                                        <Td>metres (m)</Td>
                                        <Td isNumeric>0.91444</Td>
                                   </Tr>
                              </Tbody>
                              <Tfoot>
                                   <Tr>
                                        <Th>To convert</Th>
                                        <Th>into</Th>
                                        <Th isNumeric>multiply by</Th>
                                   </Tr>
                              </Tfoot>
                         </Table>
                    </TableContainer>

               </Sidebar>
          </div>
     )
}

export default Transaction