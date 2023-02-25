import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Stats from "../components/atomic/stats/Stats";
import {
   Thead,
   Tfoot,
   Badge,
   Heading,
   Button,
   Text,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Flex,
   TableContainer,
   TableCaption,
   Box,
   Table,
   Tr,
   Th,
   Tbody,
   Td,
   Input,
   FormLabel,
   FormControl,
   Select,
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   AccordionIcon,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import format from "../helpers/dateFormat";
import { useNavigate } from "react-router";

const Transaction = () => {
   const [transaction, setTransaction] = useState([]);
   const [roomType, setRoomType] = useState([]);
   const apiURL = import.meta.env.VITE_API_URL;

   //filtering
   const [checkinDate, setCheckinDate] = useState("");
   const [checkoutDate, setCheckoutDate] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   // const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   // const startIndex = (currentPage - 1) * itemsPerPage;
   // const endIndex = startIndex + itemsPerPage;
   // const currentItems = roomList.slice(startIndex, endIndex);

   const navigate = useNavigate()

   const page = 1;
   const limit = 10;

   const handleCheckin = (e) => {
      const setCheckin = new Date(e.target.value);
      setCheckinDate(setCheckin);
   };

   const handleCheckout = (e) => {
      const setCheckout = new Date(e.target.value);
      setCheckoutDate(setCheckout);
   };

   useEffect(() => {
      async function fetchTransaction() {
         const queryParams = new URLSearchParams({
            page: page || 1,
            limit: itemsPerPage || 10,
            start_date: startDate || "",
            end_date: endDate || "",
         });
         try {
            const [transactionRes, roomTypeRes] = await Promise.all([
               fetch(`${apiURL}/order/find?${queryParams}`),
               fetch(`${apiURL}/room-type`),
            ])
            const trans = await transactionRes.json();
            const roomTypes = await roomTypeRes.json();
            setTransaction(trans.transactionData);
            setRoomType(roomTypes.data);
            console.log(trans, roomTypes);
         } catch (error) {
            console.log("Error fetching transaction data:", error);
         }
      }
      fetchTransaction();
   }, [page, limit, startDate, endDate]);

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

            <Box display="flex" alignItems="center" mb={14}>
               <Breadcrumb spacing="10px" margin={6} separator={<AiOutlineRight />}>
                  <BreadcrumbItem>
                     <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                     <BreadcrumbLink href="#">Transaction</BreadcrumbLink>
                  </BreadcrumbItem>
               </Breadcrumb>

               <Button
                  variant={"solid"}
                  colorScheme={"green"}
                  size="md"
                  fontSize={"sm"}
                  mr={6}
                  onClick={() => {
                     navigate("/transaction/add")
                  }}
               >
                  Add Transaction
               </Button>
            </Box>

            <br />

            <TableContainer p={"6"}>
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
                              // onChange={handlePerPageChange}
                              >
                                 <option value={10}>--Limit Items per-Page--</option>
                                 <option value={5}>5</option>
                                 <option value={10}>10</option>
                                 <option value={15}>15</option>
                                 <option value={20}>20</option>
                              </Select>
                           </FormControl>
                        </Box>

                        {/* <Button mb={5} onClick={handleCheckRoomAvailability}>
                        Check Available
                     </Button> */}
                     </AccordionPanel>
                  </AccordionItem>
               </Accordion>
               <Table variant="simple" colorScheme="twitter">
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
                     {transaction.map((tb, index) => {
                        return (
                           <Tr key={index}>
                              
                              <Td>{tb.order_number}</Td>
                              <Td>{tb.order_name}</Td>
                              <Td>{format.formatDateWithTime(tb.order_date)}</Td>
                              <Td>{tb.order_email}</Td>

                              <Td>
                                 {(() => {
                                    switch (tb.order_status) {
                                       case "Default":
                                          return <Badge alignContent={"center"}>Default</Badge>;
                                       case "NEW":
                                          return <Badge colorScheme="green">NEW</Badge>;
                                       case "CHECK-IN":
                                          return <Badge colorScheme="yellow">CHECK-IN</Badge>;
                                       case "CHECK-OUT":
                                          return <Badge colorScheme="red">CHECK-OUT</Badge>;
                                       default:
                                          return <Badge>{tb.order_status}</Badge>;
                                    }
                                 })()}
                              </Td>

                              <Td>{format.formatDate(tb.checkin_date)}</Td>
                              <Td>
                                 <Button variant={"outline"} size="sm">
                                    Details
                                 </Button>
                              </Td>
                           </Tr>
                        );
                     })}
                  </Tbody>
               </Table>
            </TableContainer>
         </Sidebar>
      </div>
   );
};

export default Transaction;
