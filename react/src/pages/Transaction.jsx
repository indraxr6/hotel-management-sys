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
   ButtonGroup,
   ScaleFade,
   Tooltip,
   InputRightAddon,
   InputGroup,
   Tag,
} from "@chakra-ui/react";
import { AiOutlineCopy, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import format from "../helpers/dateFormat";
import { useNavigate } from "react-router";
import Pagination from "../components/atomic/pagination/Pagination";
import Head from "../helpers/headTitle";
import withRoleGuard from "../helpers/roleGuard";
import moment from "moment";
import OrderStatusTag from "../components/atomic/orderStatusTag/OrderStatusTag";

const Transaction = () => {
   const [transaction, setTransaction] = useState([]);
   const [roomType, setRoomType] = useState([]);
   const [roomTypeReq, setRoomTypeReq] = useState(0);

   //filtering
   const [checkinDate, setCheckinDate] = useState("");
   const [checkoutDate, setCheckoutDate] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(20);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentItems = transaction ? transaction.slice(startIndex, endIndex) : [];
   const [searchQuery, setSearchQuery] = useState("");
   const apiURL = import.meta.env.VITE_API_URL;
   const navigate = useNavigate()
   const page = 1;
   const limit = 20;

   const filteredData = currentItems.filter(
      (tb) =>
         tb.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tb.order_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tb.order_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tb.order_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tb.checkin_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
         tb.checkout_date.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const handleCheckin = (e) => {
      const setCheckin = new Date(e.target.value);
      setCheckinDate(setCheckin);
   };

   const handleCheckout = (e) => {
      const setCheckout = new Date(e.target.value);
      setCheckoutDate(setCheckout);
   };

   const handlePerPageChange = (e) => {
      const newPerPage = parseInt(e.target.value, 10);
      setItemsPerPage(newPerPage);
   };

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const handleDetailsClick = (id) => {
      window.open(`/transaction/${id}`, "_blank")
   };

   const resetFilter = () => {
      fetchTransaction()
   }

   async function fetchTransaction() {
      const queryParams = new URLSearchParams({
         page: page || 1,
         limit: limit || 20,
         order: "DESC"
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
      } catch (error) {
         console.log("Error fetching transaction data:", error);
      }
   }

   useEffect(() => {
      fetchTransaction();
   }, [page, limit, checkinDate, checkoutDate]);

   const filterTransaction = async () => {
      if (!checkinDate || !checkoutDate) {
         return
      }
      const queryParams = new URLSearchParams({
         page: page || 1,
         limit: itemsPerPage || 20,
         start_date: moment(checkinDate).format('YYYY-MM-DD') || "",
         end_date: moment(checkoutDate).format('YYYY-MM-DD') || "",
         order: "ASC"
      });
      try {
         const transactionRes = await fetch(`${apiURL}/order/find?${queryParams}`)
         const trans = await transactionRes.json();
         setTransaction(trans.transactionData);
      } catch (error) {
         console.log("Error fetching transaction data:", error);
      }
   }

   return (
      <div>
         <Head title='Transactions' description={''} />
         <Sidebar>
            <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
               <Text fontSize="14px" fontFamily="SF Pro Text" fontWeight="thin">
                  Dashboard
               </Text>
            </Flex>

            <Flex h="20" alignItems="flex-start" mx="7" justifyContent="space-between">
               <Text fontSize="4xl" fontFamily="SF Pro Text" fontWeight="bold">
                  Transactions
               </Text>
            </Flex>

            {/* <Stats /> */}

            <Box display="flex" alignItems="center" mb={0}>
               <Breadcrumb spacing="10px" margin={6} separator={<AiOutlineRight />}>
                  <BreadcrumbItem>
                     <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                     <BreadcrumbLink href="#">Transaction</BreadcrumbLink>
                  </BreadcrumbItem>

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
               </Breadcrumb>

            </Box>

            <br />

            <TableContainer p={"6"}>
               <Accordion allowToggle mb={10}>
                  <AccordionItem defaultisOpen={true}>
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
                           {/* <FormControl ml={4}>
                              <FormLabel>Room Type</FormLabel>
                              <Select onChange={(e) => setRoomTypeReq(e.target.value)}>
                                 <option value={""}>--Select Room Type--</option>
                                 {roomType.map((option, index) => {
                                    return (
                                       <option key={index} value={option.id}>
                                          {option.room_type_name}
                                       </option>
                                    );
                                 })}
                              </Select>
                           </FormControl> */}
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
                           <FormControl ml={4}>
                              <FormLabel>Search</FormLabel>
                              <InputGroup>
                                 <Input
                                    placeholder="Search everything"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    type="text"
                                 />
                                 <InputRightAddon children={<AiOutlineSearch />} />
                              </InputGroup>
                           </FormControl>
                        </Box>

                        <ButtonGroup justifyContent={'flex-start'}>
                           <Button mb={5} onClick={filterTransaction}>
                              Apply Filter
                           </Button>
                           <Button mb={5} onClick={resetFilter}>
                              Reset Filter
                           </Button>
                        </ButtonGroup>

                     </AccordionPanel>
                  </AccordionItem>
               </Accordion>
               <ScaleFade in={filteredData}>
                  <Table variant="simple" size={'sm'}>
                     <TableCaption>{transaction ? transaction.length : "0"} transaction data.</TableCaption>
                     <Thead fontFamily={'inherit'}>
                        <Tr>
                           <Th>No.</Th>
                           <Th>Order Number</Th>
                           <Th>Order Name</Th>
                           <Th>Order Email</Th>
                           <Th>Status</Th>
                           <Th>Check-In Date</Th>
                           <Th>Check-Out Date</Th>
                           <Th>Action</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {filteredData.map((tb, index) => {
                           return (
                              <Tr key={index}>
                                 <Td>{startIndex + index + 1}</Td>
                                 <Td>{tb.order_number}</Td>
                                 <Td>{tb.order_name}</Td>
                                 <Td>{tb.order_email}</Td>
                                 <Td>
                                    <OrderStatusTag orderStatus={tb.order_status} />
                                 </Td>
                                 <Td>{format.formatDate(tb.checkin_date)}</Td>
                                 <Td>{format.formatDate(tb.checkout_date)}</Td>
                                 <Td>
                                    <ButtonGroup>
                                       <Tooltip hasArrow label={'Copy Order Number'}>
                                          <Button variant={"outline"} size="sm" onClick={() => navigator.clipboard.writeText(tb.order_number)} width={'75%'}>
                                             <AiOutlineCopy />
                                          </Button>
                                       </Tooltip>
                                       <Tooltip hasArrow label={'See Order Details'}>
                                          <Button variant={"outline"} size="sm" onClick={() => handleDetailsClick(tb.order_number)} width={'75%'}>
                                             <HiOutlineArrowSmRight size={20} />
                                          </Button>
                                       </Tooltip>
                                    </ButtonGroup>
                                 </Td>
                              </Tr>
                           );
                        })}

                     </Tbody>
                  </Table>
               </ScaleFade>
               <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={transaction ? transaction.length : null}
                  onPageChange={handlePageChange}
                  handlePerPageChange={handlePerPageChange}
               />
            </TableContainer>
         </Sidebar>

      </div>
   );
};

export default withRoleGuard(Transaction, ["ADMIN", "RECEPTIONIST", "SUPERADMIN", "CUSTOMER"]);
