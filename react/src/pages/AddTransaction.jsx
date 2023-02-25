import { useState, useEffect } from 'react';
import { Box, Input, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, TableContainer, FormControl, FormLabel, Select, Checkbox, Tbody, Table, Tr, Td, Thead, Th, TableCaption, Flex, Stack } from '@chakra-ui/react';
import { AiOutlineRight } from "react-icons/ai";
import Sidebar from '../components/sidebar/Sidebar'
import { useNavigate } from 'react-router';


function AddTransactionPage() {
     const [roomType, setRoomType] = useState([]);
     const [roomList, setRoomList] = useState([])
     const [roomNumberReq, setRoomNumberReq] = useState([]);
     const [checkedRooms, setCheckedRooms] = useState(new Array(roomList.length).fill(false));
     const [isLoading, setIsLoading] = useState(false)
     const [checkinDate, setCheckinDate] = useState('');
     const [checkoutDate, setCheckoutDate] = useState('');
     const [roomTypeReq, setRoomTypeReq] = useState('')
     const apiURL = import.meta.env.VITE_API_URL;
     const navigate = useNavigate()

     const handleCheckin = (e) => {
          const setCheckin = new Date(e.target.value);
          setCheckinDate(setCheckin);
     };

     const handleCheckout = (e) => {
          const setCheckout = new Date(e.target.value);
          setCheckoutDate(setCheckout);
     };

     const handleRoomTypeReq = (e) => {
          setRoomTypeReq(e.target.value);
          setRoomNumberReq([]);
          setCheckedRooms(new Array(roomList.length).fill(false));
     }

     const handleRoomSelect = (roomNumber) => {
          setRoomNumberReq(prevRoomNumberReq => {
               if (prevRoomNumberReq.includes(roomNumber)) {
                    return prevRoomNumberReq.filter(num => num !== roomNumber);
               } else {
                    return [...prevRoomNumberReq, roomNumber];
               }
          });
     }

     const findRequest = {
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          room_type_name: roomTypeReq,
     };

     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch(`${apiURL}/room-type`);
                    const data = await response.json();
                    setRoomType(data.data);
               } catch (error) {
                    console.log('Error fetching room type data:', error);
               }
          }
          fetchRoomTypes();
     }, [checkinDate, checkoutDate, roomTypeReq]);

     useEffect(() => {
          async function fetchRoomAvailability() {
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
                    console.log(data, "roooomomdsb")
               } catch (error) {
                    console.log("Error fetching room availability:", error);
               }
          }

          if (checkinDate && checkoutDate && roomTypeReq) {
               fetchRoomAvailability();
               setRoomNumberReq([])
          }
     }, [checkinDate, checkoutDate, roomTypeReq]);

     console.log(roomNumberReq, "room number req")

    


     return (
          <Sidebar>
               <Flex
                    h="5"
                    alignItems="flex-start"
                    mx="31px"
                    justifyContent="space-between"
               >
                    <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                         Dashboard
                    </Text>
               </Flex>

               <Flex
                    h="20"
                    alignItems="flex-start"
                    mx="29px"
                    justifyContent="space-between"
               >
                    <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                         Add Transaction
                    </Text>
               </Flex>


               <TableContainer p={"6"}>
                    <Breadcrumb spacing="10px" mb={7} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink onClick={() => navigate(-2)} href="#">Dashboard</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink onClick={() => navigate(-1)} href="#">Transaction</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem >
                              <BreadcrumbLink href="#">Add Transaction</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>

                    <Box display="flex" alignItems="center" mb={"7"} width={"100%"} borderWidth={1} p={4}>
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
                         <FormControl mr={4}>
                              <FormLabel>Check-In Date</FormLabel>
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
                              <Select onChange={handleRoomTypeReq}>
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
                    </Box>
                    {
                         checkinDate && checkoutDate && roomTypeReq ? (

                              <div>
                                   {isLoading ? (
                                        <p>Loading...</p>
                                   ) : (
                                        <div>
                                             {roomList ? (
                                                  <Box alignItems="center" mb={"7"} borderWidth={1} p={10}>
                                                       <Text fontSize="1xl" fontFamily="monospace" fontWeight="bold" mb={5}>
                                                            Select Room Numbers
                                                       </Text>

                                                       <Table variant="simple" size={'md'}>
                                                            <Thead>
                                                                 <Tr>
                                                                      <Th></Th>
                                                                      <Th>Room ID</Th>
                                                                      <Th>Room Number</Th>
                                                                      <Th>Room Type</Th>
                                                                 </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                 {roomList.map((tb, index) => {
                                                                      return (
                                                                           <Tr key={index}>
                                                                                <Td><Checkbox onChange={() => handleRoomSelect(tb.id)} isChecked={roomNumberReq.includes(tb.id)}/></Td>
                                                                                <Td>{tb.id}</Td>
                                                                                <Td>{tb.room_number}</Td>
                                                                                <Td>{tb.room_type_name}</Td>
                                                                           </Tr>
                                                                      );
                                                                 })}
                                                            </Tbody>
                                                       </Table>
                                                  </Box>

                                             ) : (
                                                  <p>No rooms are available.</p>
                                             )}
                                        </div>
                                   )}
                              </div>
                         ) : null



                    }
               </TableContainer>

          </Sidebar>
     );
}

export default AddTransactionPage;
