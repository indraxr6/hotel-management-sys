import { useState, useEffect } from "react";
import {
     Box,
     Input,
     Text,
     Breadcrumb,
     BreadcrumbItem,
     BreadcrumbLink,
     TableContainer,
     FormControl,
     FormLabel,
     Select,
     Checkbox,
     Tbody,
     Table,
     Tr,
     Td,
     Thead,
     Th,
     TableCaption,
     Flex,
     Button,
     InputRightAddon,
     InputGroup,
     ScaleFade,
     Alert,
     AlertIcon,
     ButtonGroup
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import AlertConfirmation from "../components/atomic/alertConfirmation/alertConfirmation";
import Lottie from "lottie-react";
import successIcon from '../assets/lotties/success.json';
import Head from "../helpers/headTitle";
import withRoleGuard from "../helpers/roleGuard";

function AddTransactionPage() {
     const [roomType, setRoomType] = useState([]);
     const [roomList, setRoomList] = useState([]);
     const [roomNumberReq, setRoomNumberReq] = useState([]);
     const [checkedRooms, setCheckedRooms] = useState(new Array(roomList.length).fill(false));
     const [isLoading, setIsLoading] = useState(false);
     const [checkinDate, setCheckinDate] = useState("");
     const [checkoutDate, setCheckoutDate] = useState("");
     const [roomTypeReq, setRoomTypeReq] = useState(0);
     const [orderId, setOrderId] = useState("");
     const [orderName, setOrderName] = useState("");
     const [orderEmail, setOrderEmail] = useState("");
     const [guestName, setGuestName] = useState("");
     const [isOpen, setIsOpen] = useState(false);
     const [animation, setAnimation] = useState(false);
     const isValidDate = checkinDate <= checkoutDate;
     const validDate = isValidDate || (!checkinDate && !checkoutDate);
     const apiURL = import.meta.env.VITE_API_URL;
     const navigate = useNavigate();

     const handleCheckin = (e) => {
          const setCheckin = new Date(e.target.value);
          setCheckinDate(setCheckin);
     };

     const handleCheckout = (e) => {
          const setCheckout = new Date(e.target.value);
          setCheckoutDate(setCheckout);
     };

     const handleRoomTypeReq = (e) => {
          setRoomList([]);
          setRoomTypeReq(e.target.value);
          setRoomNumberReq([]);
          setOrderName("");
          setOrderEmail("");
          setGuestName("");
          setCheckedRooms(new Array(roomList.length).fill(false));
     };

     const handleRoomSelect = (roomNumber) => {
          setRoomNumberReq((prevRoomNumberReq) => {
               if (prevRoomNumberReq.includes(roomNumber)) {
                    return prevRoomNumberReq.filter((num) => num !== roomNumber);
               } else {
                    return [...prevRoomNumberReq, roomNumber];
               }
          });
     };

     const handleOpenAlert = () => {
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const handleTransactionDetail = () => {
          window.open(`/transaction/${orderId}`, "_blank");
          // navigate(`/transaction/${orderId}`);
     };

     const findRequest = {
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          room_type_name: roomTypeReq,
     };

     const transactionData = {
          order_name: orderName,
          order_email: orderEmail,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          guest_name: guestName,
          id_room_type: parseInt(roomTypeReq),
          id_room: roomNumberReq,
          id_user: "@MYDWJ",
     };

     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch(`${apiURL}/room-type`);
                    const data = await response.json();
                    setRoomType(data.data);
               } catch (error) {
                    console.log("Error fetching room type data:", error);
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
               } catch (error) {
                    console.log("Error fetching room availability:", error);
               }
          }

          if (checkinDate && checkoutDate && roomTypeReq) {
               fetchRoomAvailability();
               setRoomNumberReq([]);
          }
     }, [checkinDate, checkoutDate, roomTypeReq]);

     const addTransaction = async () => {
          try {
               const response = await fetch(`${apiURL}/order/add-transaction`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(transactionData),
               });
               const data = await response.json();
               if (response.ok) {
                    setCheckinDate('')
                    setCheckoutDate('')
                    setRoomTypeReq('')
                    setRoomNumberReq([])
                    setAnimation(true)
               }
               setOrderId(data.order_data.order.order_number);
          } catch (error) {
               console.log("Error making order:", error);
          }
     };


     const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: successIcon,
          rendererSettings: {
               preserveAspectRatio: "xMidYMid slice"
          }
     }

     const style = {
          height: 400,
          width: 400,
     };

     return (
          <Sidebar>
               <Head title='Add Transaction' description={''} />
               <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
                    <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                         Dashboard
                    </Text>
               </Flex>

               <Flex h="20" alignItems="flex-start" mx="29px" justifyContent="space-between">
                    <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                         Add Transaction
                    </Text>
               </Flex>

               <TableContainer p={"6"}>
                    <Breadcrumb spacing="10px" mb={7} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink onClick={() => navigate(-2)} href="#">
                                   Dashboard
                              </BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink onClick={() => navigate(-1)} href="#">
                                   Transaction
                              </BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href="#">Add Transaction</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>

                    {animation ?
                         <>
                              <ScaleFade in={animation}>
                                   <Flex justifyContent="center" alignItems="center" >
                                        <Lottie animationData={successIcon} autoplay={true} loop={true} style={style} />
                                   </Flex>
                                   <Text fontSize="24px" fontFamily="monospace" fontWeight="thin">
                                        Success Add Transaction
                                   </Text>
                                   <ButtonGroup mt={10}>
                                        <Button colorScheme="teal" onClick={handleTransactionDetail}>
                                             See Order Details
                                        </Button>
                                        <Button onClick={() => setAnimation(false)}>Go Back</Button>
                                   </ButtonGroup>
                              </ScaleFade>
                         </>
                         :
                         <Box alignItems="center" mb={"7"} width={"100%"} borderWidth={1} p={4}>
                              <Box display="flex" mb={'4'}>
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
                                        <Select onChange={handleRoomTypeReq}>
                                             <option value={""}>--Select Room Type--</option>
                                             {roomType.map((option, index) => {
                                                  return (
                                                       <option key={index} value={option.id}>
                                                            {option.room_type_name}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   </FormControl>
                              </Box>
                              {!isValidDate ?
                                   <ScaleFade in={true}>
                                        <Alert status="error" width={"100%"} borderRadius={5}>
                                             <AlertIcon />
                                             Checkout date must be after checkin date
                                        </Alert>
                                   </ScaleFade>
                                   : null
                              }
                              {/* {checkinDate <= checkoutDate ? setValidDate(true) :
                              <ScaleFade in={true}>
                                   <Alert status="error" width={"100%"} borderRadius={5}>
                                        <AlertIcon />
                                        Checkout date must be after checkin date
                                   </Alert>
                              </ScaleFade>
                         } */}
                         </Box>
                    }

                    {checkinDate && checkoutDate && roomTypeReq && validDate ? (
                         <div>
                              {isLoading ? (
                                   <p>Loading...</p>
                              ) : (
                                   <div>
                                        {roomList ? (
                                             <ScaleFade in={true}>
                                                  <Box alignItems="center" mb={"7"} borderWidth={1} p={10}>
                                                       <Text fontSize="1xl" fontFamily="monospace" fontWeight="bold" mb={5}>
                                                            Select Room Numbers
                                                       </Text>

                                                       <Table variant="simple" size={"sm"}>
                                                            <TableCaption>{roomNumberReq.length} rooms selected</TableCaption>

                                                            <Thead mb={9}>
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
                                                                                <Td>
                                                                                     <Checkbox
                                                                                          onChange={() => handleRoomSelect(tb.id)}
                                                                                          isChecked={roomNumberReq.includes(tb.id)}
                                                                                     />
                                                                                </Td>
                                                                                <Td>{tb.id}</Td>
                                                                                <Td>{tb.room_number}</Td>
                                                                                <Td>{tb.room_type_name}</Td>
                                                                           </Tr>
                                                                      );
                                                                 })}
                                                            </Tbody>
                                                       </Table>
                                                  </Box>
                                             </ScaleFade>
                                        ) : (
                                             <Text>No rooms are available.</Text>
                                        )}
                                   </div>
                              )}
                         </div>
                    ) : null}
                    {roomNumberReq.length > 0 ? (
                         <>
                              <Box
                                   display="flex"
                                   alignItems="center"
                                   mb={"7"}
                                   width={"100%"}
                                   borderWidth={1}
                                   p={4}
                              >
                                   <FormControl mr={4}>
                                        <FormLabel>Order Name</FormLabel>
                                        <InputGroup>
                                             <Input
                                                  type={"text"}
                                                  placeholder={"John Doe"}
                                                  onChange={(e) => setOrderName(e.target.value)}
                                             />
                                             <InputRightAddon children={<GrContactInfo />} />
                                        </InputGroup>
                                   </FormControl>

                                   <FormControl mr={4}>
                                        <FormLabel>Order E-Mail</FormLabel>
                                        <InputGroup>
                                             <Input
                                                  type={"text"}
                                                  placeholder={"johndoe@example.com"}
                                                  onChange={(e) => setOrderEmail(e.target.value)}
                                             />
                                             <InputRightAddon children={<AiOutlineMail />} />
                                        </InputGroup>
                                   </FormControl>

                                   <FormControl ml={4}>
                                        <FormLabel>Guest(s) name</FormLabel>
                                        <InputGroup>
                                             <Input
                                                  type={"text"}
                                                  placeholder={"John Doe, Jane Doe, etc."}
                                                  onChange={(e) => setGuestName(e.target.value)}
                                             />
                                             <InputRightAddon children={<MdOutlinePeopleAlt />} />
                                        </InputGroup>
                                   </FormControl>
                              </Box>

                              {orderName && orderEmail && guestName ?
                                   <Button mb={5} onClick={handleOpenAlert} colorScheme={'green'}>
                                        Add Order
                                   </Button>
                                   : null
                              }
                         </>
                    ) : null}
                    <AlertConfirmation
                         isOpen={isOpen}
                         onClose={handleCloseAlert}
                         title={"Add Transaction"}
                         message={"Are you sure you want to add this transaction?"}
                         addTransaction={addTransaction}
                         setAnimation={setAnimation}
                         setCheckinDate={setCheckinDate}
                         setCheckoutDate={setCheckoutDate}
                         setRoomTypeReq={setRoomTypeReq}
                         setRoomNumberReq={setRoomNumberReq}
                    />
               </TableContainer>
          </Sidebar>
     );
}

export default withRoleGuard(AddTransactionPage, ["ADMIN", "RECEPTIONIST"]);;
