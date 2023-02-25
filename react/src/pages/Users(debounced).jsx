import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import {
     Text, Button, TableContainer, Table,
     Tr,
     Th,
     Tbody,
     Thead,
     Td, Badge, TableCaption, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Avatar, ButtonGroup, FormControl, FormLabel, Select, Input, InputRightAddon, InputGroup
} from '@chakra-ui/react'
import { AiOutlineRight } from 'react-icons/ai'
import { debounce } from 'lodash'

const Users = () => {
     const [userData, setUserData] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
     const [filteredData, setFilteredData] = useState([]);
     const [searchTerm, setSearchTerm] = useState([]);
     const apiURL = import.meta.env.VITE_API_URL


     // const filteredUserData = userData.filter((tb) =>
     //      tb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     //      tb.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     //      tb.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
     //      tb.email.toLowerCase().includes(searchQuery.toLowerCase()) 
     // );

     const handleSearchTerm = debounce((searchQuery) => {
          const filterData = userData.filter((tb) =>
               tb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tb.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tb.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
               tb.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          setFilteredData(filterData)

     }, 500);

     const handleSearchTermChange = (event) => {
          const term = event.target.value;
          setSearchQuery(term)
          setSearchTerm(term);
          handleSearchTerm(term);
     };


     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch('http://localhost:5000/user');
                    const data = await response.json();
                    setUserData(data.data);
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

                    <TableContainer p={"6"}>
                         <FormLabel>Search</FormLabel>
                         <FormControl mb={12}>
                              <InputGroup>
                                   <Input placeholder='Search here' value={searchQuery} onChange={handleSearchTermChange} type='text' width={'40%'} />
                                   {/* <Input placeholder='Search here' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type='text' width={'40%'} /> */}
                                   <InputRightAddon children='.com' />
                              </InputGroup>
                         </FormControl>

                         <Table variant="simple" colorScheme="twitter">
                              <TableCaption>Imperial to metric conversion factors</TableCaption>
                              <Thead>
                                   <Tr>
                                        <Th></Th>
                                        <Th>User ID</Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        {/* <Th>Password</Th> */}
                                        <Th>Role</Th>
                                        <Th>Action</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {filteredData.map((tb, index) => {
                                   // {filteredUserData.map((tb, index) => {
                                        return (
                                             <Tr key={index}>
                                                  <Td>
                                                       <Avatar
                                                            size={'sm'}
                                                            src={`${apiURL}/images/profile/${tb.photo}`} />
                                                  </Td>
                                                  <Td>{tb.id}</Td>
                                                  <Td>{tb.name}</Td>
                                                  <Td>{tb.email}</Td>
                                                  {/* <Td>{tb.password}</Td> */}

                                                  <Td>
                                                       {(() => {
                                                            switch (tb.role) {
                                                                 case "Default":
                                                                      return <Badge alignContent={"center"}>Default</Badge>;
                                                                 case "CUSTOMER":
                                                                      return <Badge colorScheme="green">CUSTOMER</Badge>;
                                                                 case "RECEPTIONIST":
                                                                      return <Badge colorScheme="yellow">RECEPTIONIST</Badge>;
                                                                 case "ADMIN":
                                                                      return <Badge colorScheme="red">ADMIN</Badge>;
                                                                 default:
                                                                      return <Badge>UNKNOWN</Badge>;
                                                            }
                                                       })()}
                                                  </Td>

                                                  <Td>
                                                       <ButtonGroup spacing={4} width={"100%"}>
                                                            <Button
                                                                 variant={"solid"}
                                                                 colorScheme={"blue"}
                                                                 flex={1}
                                                                 size="sm"
                                                            >
                                                                 Edit
                                                            </Button>
                                                            <Button
                                                                 variant={"solid"}
                                                                 colorScheme={"red"}
                                                                 flex={1}
                                                                 size="sm"
                                                            >
                                                                 Delete
                                                            </Button>
                                                       </ButtonGroup>

                                                  </Td>
                                             </Tr>
                                        );
                                   })}
                              </Tbody>
                         </Table>
                    </TableContainer>


               </Sidebar>
          </div>
     )
}

export default Users