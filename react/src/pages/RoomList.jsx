import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { AiOutlineRight } from "react-icons/ai";
import {
   Text,
   Button,
   ButtonGroup,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   TableContainer,
   TableCaption,
   Box,
   Table,
   Thead,
   Tr,
   Th,
   Tbody,
   Td,
   Input,
   FormLabel,
   FormControl,
   Tabs,
   TabList,
   TabPanels,
   Tab,
   TabPanel,
   Select,
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   AccordionIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Pagination from "../components/atomic/pagination/Pagination";
import Head from "../helpers/headTitle";
import withRoleGuard from "../helpers/roleGuard";


const RoomList = () => {
   const [roomList, setRoomList] = useState([]);
   const [roomRemaining, setRoomRemaining] = useState([]);
   const [roomType, setRoomType] = useState([]);
   const [roomStatus, setRoomStatus] = useState("");
   const [checkinDate, setCheckinDate] = useState("");
   const [checkoutDate, setCheckoutDate] = useState("");
   const [roomTypeReq, setRoomTypeReq] = useState("");

   const apiURL = import.meta.env.VITE_API_URL;
   const navigate = useNavigate();
   //filtering
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentItems = roomList.slice(startIndex, endIndex);

   const handlePerPageChange = (e) => {
      const newPerPage = parseInt(e.target.value, 10);
      setItemsPerPage(newPerPage);
   };

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const handleCheckin = (e) => {
      const setCheckin = new Date(e.target.value);
      setCheckinDate(setCheckin);
   };

   const handleCheckout = (e) => {
      const setCheckout = new Date(e.target.value);
      setCheckoutDate(setCheckout);
   };

   const findRequest = {
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      room_type_name: roomTypeReq,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
   };

   const handleCheckRoomAvailability = async () => {
      try {
         const response = await fetch(`${apiURL}/room/find/check-availability`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(findRequest),
         });
         const data = await response.json();
         setRoomList(data.data);
      } catch (error) {
         console.log("Error fetching room availability:", error);
      }
   };

   const handleCheckRoomRemaining = async () => {
      try {
         const response = await fetch(`${apiURL}/room/find/check-remaining`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(findRequest),
         });
         const data = await response.json();
         setRoomRemaining(data.data);
      } catch (error) {
         console.log("Error fetching room availability:", error);
      }
   };

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
         <Head title='Room List' description={''} />
         <Sidebar>
            <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
               <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                  Dashboard
               </Text>
            </Flex>

            <Flex h="20" alignItems="flex-start" mx="29px" justifyContent="space-between">
               <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                  Room List
               </Text>
            </Flex>

            <Breadcrumb spacing="10px" margin={7} separator={<AiOutlineRight />}>
               <BreadcrumbItem>
                  <BreadcrumbLink href="#">Room List</BreadcrumbLink>
               </BreadcrumbItem>

               <BreadcrumbItem>
                  <BreadcrumbLink href="#">About</BreadcrumbLink>
               </BreadcrumbItem>

               <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Contact</BreadcrumbLink>
               </BreadcrumbItem>
            </Breadcrumb>

            <TableContainer p={"6"}>
               <Tabs isFitted variant="enclosed">
                  <TabList mb="4em">
                     <Tab>Room Availability</Tab>
                     <Tab>Room Remaining</Tab>
                  </TabList>
                  <TabPanels>
                     <TabPanel>
                        <Accordion allowToggle mb={10}>
                           <AccordionItem>
                              <h2>
                                 <AccordionButton>
                                    <Box as="span" flex="1" textAlign="right">
                                       Filter
                                    </Box>
                                    <AccordionIcon />
                                 </AccordionButton>
                              </h2>
                              <AccordionPanel>
                                 <Box display="flex" alignItems="center" mb={"7"} width={"100%"}>
                                    <FormControl mr={4}>
                                       <FormLabel>Check-In Date</FormLabel>
                                       <Input
                                          placeholder="Select Date and Time"
                                          size="md"
                                          type="date"
                                          flex={1}
                                          value={
                                             checkinDate instanceof Date
                                                ? checkinDate.toISOString().substring(0, 10)
                                                : ""
                                          }
                                          onChange={handleCheckin}
                                       />
                                    </FormControl>
                                    <FormControl ml={4}>
                                       <FormLabel>Check-Out Date</FormLabel>
                                       <Input
                                          placeholder="Select Date and Time"
                                          size="md"
                                          type="date"
                                          flex={1}
                                          value={
                                             checkoutDate instanceof Date
                                                ? checkoutDate.toISOString().substring(0, 10)
                                                : ""
                                          }
                                          onChange={handleCheckout}
                                       />
                                    </FormControl>
                                    <FormControl ml={4}>
                                       <FormLabel>Room Type</FormLabel>
                                       <Select onChange={(e) => setRoomTypeReq(e.target.value)}>
                                          <option value={""}>--Select Room Type--</option>
                                          {roomType.map((option, index) => {
                                             return (
                                                <option key={index} value={option.room_type_name}>
                                                   {option.room_type_name}
                                                </option>
                                             );
                                          })}
                                       </Select>
                                    </FormControl>
                                    <FormControl ml={4}>
                                       <FormLabel htmlFor="items-per-page">Item Limit</FormLabel>
                                       <Select
                                          id="items-per-page"
                                          value={itemsPerPage}
                                          onChange={handlePerPageChange}
                                       >
                                          <option value={10}>--Limit Items per-Page--</option>
                                          <option value={5}>5</option>
                                          <option value={10}>10</option>
                                          <option value={15}>15</option>
                                          <option value={20}>20</option>
                                       </Select>
                                    </FormControl>
                                 </Box>

                                 <Button mb={5} onClick={handleCheckRoomAvailability}>
                                    Check Available
                                 </Button>
                              </AccordionPanel>
                           </AccordionItem>
                        </Accordion>

                        <Table variant="simple" colorScheme="twitter">
                           <TableCaption>{roomList.length} rooms available</TableCaption>

                           <Thead>
                              <Tr>
                                 <Th>Room ID</Th>
                                 <Th>Room Number</Th>
                                 <Th>Room Type</Th>
                                 {localStorage.getItem("role") === "ADMIN" ? <Th>Actions</Th> : null}
                              </Tr>
                           </Thead>
                           <Tbody>
                              {currentItems.map((tb, index) => {
                                 return (
                                    <Tr key={index}>
                                       <Td>{tb.id}</Td>
                                       <Td>{tb.room_number}</Td>
                                       <Td>
                                          {roomList.room_types
                                             ? tb.room_types.room_type_name
                                             : tb.room_type_name}
                                       </Td>
                                    {localStorage.getItem("role") === "admin" ? 
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
                                       : null
                                       }
                                    </Tr>
                                 );
                              })}
                           </Tbody>
                        </Table>

                        <Pagination
                           currentPage={currentPage}
                           itemsPerPage={10}
                           totalItems={roomList.length}
                           onPageChange={handlePageChange}
                           handlePerPageChange={handlePerPageChange}
                        />
                     </TabPanel>

                     <TabPanel>
                        <Box display="flex" alignItems="center" mb={"5"} width={"100%"}>
                           <FormControl mr={4}>
                              <FormLabel>Check-In Date</FormLabel>
                              <Input
                                 placeholder="Select Date and Time"
                                 size="md"
                                 type="date"
                                 flex={1}
                                 value={
                                    checkinDate instanceof Date
                                       ? checkinDate.toISOString().substring(0, 10)
                                       : ""
                                 }
                                 onChange={handleCheckin}
                              />
                           </FormControl>
                           <FormControl ml={4}>
                              <FormLabel>Check-Out Date</FormLabel>
                              <Input
                                 placeholder="Select Date and Time"
                                 size="md"
                                 type="date"
                                 flex={1}
                                 value={
                                    checkoutDate instanceof Date
                                       ? checkoutDate.toISOString().substring(0, 10)
                                       : ""
                                 }
                                 onChange={handleCheckout}
                              />
                           </FormControl>
                        </Box>
                        <Button mb={5} onClick={handleCheckRoomRemaining} disabled>
                           Check Remaining
                        </Button>

                        <Table variant="simple" colorScheme="twitter">
                           {roomRemaining.length == 0 ? (
                              <TableCaption>
                                 Input specified date to check room remainings
                              </TableCaption>
                           ) : (
                              ""
                           )}
                           <Thead>
                              <Tr>
                                 <Th>ID</Th>
                                 <Th>Room Type</Th>
                                 <Th>Price</Th>
                                 <Th>Room Remaining</Th>
                                 <Th>Action</Th>
                              </Tr>
                           </Thead>
                           <Tbody>
                              {roomRemaining.map((tb, index) => {
                                 return (
                                    <Tr key={index}>
                                       <Td>{tb.id}</Td>
                                       <Td>
                                          {roomList.room_types
                                             ? tb.room_types.room_type_name
                                             : tb.room_type_name}
                                       </Td>
                                       <Td>${tb.price}</Td>
                                       <Td>{tb.room_remaining} Rooms</Td>
                                       {localStorage.getItem("role") == "ADMIN" ? 
                                       <Td>
                                          <Button
                                             variant="ghost"
                                             colorScheme="blue"
                                             onClick={() => navigate(`/room-types/${tb.id}`)}
                                          >
                                             Details
                                          </Button>
                                       </Td>
                                       : null
                                       }
                                    </Tr>
                                 );
                              })}
                           </Tbody>
                        </Table>
                     </TabPanel>
                  </TabPanels>
               </Tabs>
            </TableContainer>
         </Sidebar>
      </div>
   );
};

export default withRoleGuard(RoomList, ["ADMIN", "RECEPTIONIST"]);
