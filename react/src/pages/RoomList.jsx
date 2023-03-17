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
   Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Pagination from "../components/atomic/pagination/Pagination";
import Head from "../helpers/headTitle";
import withRoleGuard from "../helpers/roleGuard";
import AlertModalForm from "../components/atomic/alertModalForm/AlertModalForm";
import AlertConfirmation from "../components/atomic/alertConfirmation/alertConfirmation";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";



const RoomList = () => {
   const [roomList, setRoomList] = useState([]);
   const [roomRemaining, setRoomRemaining] = useState([]);
   const [roomType, setRoomType] = useState([]);
   const [roomStatus, setRoomStatus] = useState("");
   const [checkinDate, setCheckinDate] = useState("");
   const [checkoutDate, setCheckoutDate] = useState("");
   // const [roomTypeReq, setRoomTypeReq] = useState("");
   const [roomDelete, setDeleteRoom] = useState("");
   const [roomUpdate, setUpdateRoom] = useState("");

   const [roomNumberReq, setRoomNumberReq] = useState("")
   const [roomTypeReq, setRoomTypeReq] = useState("")

   const [formErr, setFormErr] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);

   const apiURL = import.meta.env.VITE_API_URL;
   const navigate = useNavigate();
   //filtering
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(20);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentItems = roomList;
   const [filteredData, setFilteredData] = useState(currentItems);

   const totalRoomsRemaining = roomRemaining.reduce((total, roomType) => total + roomType.room_remaining, 0);

   // const currentItems = roomList.slice(startIndex, endIndex);



   const handleRoomTypeSelect = (event) => {
      const selectedRoomType = parseInt(event.target.value);
      if (selectedRoomType) {
        const filteredItems = currentItems.filter((item) => {
          return (
            item.id_room_type === selectedRoomType
          );
        });
        console.log(filteredItems);
        setFilteredData(filteredItems);
        setCurrentPage(1); 
      } else {
        setFilteredData(currentItems);
      }
    };

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

   const handleDelete = (id) => {
      setDeleteRoom(id)
      setIsOpen(true)
   }

   const handleUpdate = (id) => {
      setUpdateRoom(id)
      setIsOpenModal(true)
   }

   const findRequest = {
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      // room_type_name: roomTypeReq,
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
         setFilteredData(data.data);
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

   const deleteRoom = async (id) => {
      try {
         const response = await fetch(`${apiURL}/room/delete/${id}`, {
            method: "DELETE"
         })
         const data = await response.json()
         if (response.ok) {
            window.location.reload()
         }
      } catch (err) {
         console.log("Error deleting room :", err);
      }
   }

   const updateRoom = async (id) => {
      try {
         const response = await fetch(`${apiURL}/room/edit/${id}`, {
            method: "PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(editRequest)
         })
         const data = await response.json()
         if (response.ok) {
            window.location.reload()
         }
      } catch (err) {
         console.log("Error deleting room :", err);
      }
   }

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
            setFilteredData(rooms.data);
            setRoomType(roomTypes.data);
         } catch (error) {
            console.log("Error fetching room data:", error);
         }
      }
      fetchRoomData();
   }, []);

   const handleChange = (prop) => (e) => {
      if (roomNumberReq === "" || roomTypeReq === "") {
         setFormErr(true);
      } else {
         setFormErr(false);
      }

      if (prop === 'room_number') {
         setRoomNumberReq(e.target.value);

      }
      if (prop === 'room_type') {
         setRoomTypeReq(e.target.value);
      }
   }

   const editRequest = {
      ...(roomNumberReq && { room_number: roomNumberReq }),
      ...(parseInt(roomTypeReq) && { id_room_type: parseInt(roomTypeReq) })
   };

   const handleCloseAlert = () => {
      setIsOpen(false);
   };

   const handleOpenModal = () => {
      setIsOpenModal(true);
   }

   const handleCloseModal = () => {
      setIsOpenModal(false);
   }

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
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
               </BreadcrumbItem>

               <BreadcrumbItem>
                  <BreadcrumbLink href="#">Room List</BreadcrumbLink>
               </BreadcrumbItem>

               <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Room Availability</BreadcrumbLink>
               </BreadcrumbItem>
               <Button
                  variant={"solid"}
                  colorScheme={"green"}
                  size="md"
                  fontSize={"sm"}
                  mr={6}
                  onClick={() => {
                     navigate("/room/add")
                  }}
               >
                  Add Room
               </Button>
            </Breadcrumb>

            <TableContainer p={"6"}>
               <Tabs isFitted variant='soft-rounded'>
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
                                       <Select onChange={handleRoomTypeSelect}>
                                          <option value={0}>--Select Room Type--</option>
                                          <option value={""}>Show All Room</option>
                                          {roomType.map((option, index) => {
                                             return (
                                                <option key={index} value={option.id}>
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
                           <TableCaption>{filteredData.length} rooms available</TableCaption>
                           <Thead>
                              <Tr>
                                 <Th>Room ID</Th>
                                 <Th>Room Number</Th>
                                 <Th>Room Type</Th>
                                 {localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "SUPERADMIN" ? <Th>Actions</Th> : null}
                              </Tr>
                           </Thead>
                           <Tbody>
                              {filteredData.slice(startIndex, endIndex).map((tb, index) => {
                                 return (
                                    <Tr key={index}>
                                       <Td>{tb.id}</Td>
                                       <Td>{tb.room_number}</Td>
                                       <Td>
                                          {roomList.room_types
                                             ? tb.room_types.room_type_name
                                             : tb.room_type_name}
                                       </Td>
                                       {localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "SUPERADMIN" ?
                                          <Td>
                                             <ButtonGroup spacing={4} width={"100%"}>
                                                <Tooltip hasArrow label={'Edit'}>
                                                <Button
                                                   variant={"solid"}
                                                   colorScheme={"blue"}
                                                   flex={1}
                                                   size="sm"
                                                   onClick={() => handleUpdate(tb.id)}
                                                >
                                                   <AiOutlineEdit size={20}/>
                                                </Button>

                                                </Tooltip>
                                                <Tooltip hasArrow label={'Delete'}>
                                                <Button
                                                   variant={"solid"}
                                                   colorScheme={"red"}
                                                   flex={1}
                                                   size="sm"
                                                   onClick={() => handleDelete(tb.id)}
                                                >
                                                   <AiOutlineDelete size={18}/>
                                                </Button>
                                                </Tooltip>
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
                           currentPage={filteredData}
                           itemsPerPage={itemsPerPage}
                           totalItems={filteredData.length}
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
                           {roomRemaining.length == 0 ? 
                           (
                              <TableCaption>
                                 Input specified date to check room remainings
                              </TableCaption>
                           ) : (
                              <TableCaption>
                                 {totalRoomsRemaining} rooms remaining total from date specified.
                              </TableCaption>
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
                                       <Td>
                                          <Button
                                             variant="ghost"
                                             colorScheme="blue"
                                             onClick={() => navigate(`/room-types/${tb.id}`)}
                                          >
                                             Details
                                          </Button>
                                       </Td>
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

         <AlertConfirmation
            isOpen={isOpen}
            onClose={handleCloseAlert}
            title={"Delete Room"}
            message={"Are you sure you want to delete this room?"}
            deleteRoom={() => deleteRoom(roomDelete)}
            type={'delete'}
         />

         <AlertModalForm
            isOpen={isOpenModal}
            onOpen={handleOpenModal}
            onClose={handleCloseModal}
            title={"Edit Room Data"}
            updateRoom={() => updateRoom(roomUpdate)}
            handleChange={handleChange}
            formErr={formErr}
            roomType={roomType}
         />
      </div>
   );
};

export default withRoleGuard(RoomList, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);
