import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import {
     Text,
     Button,
     Stack,
     Card,
     CardBody,
     Heading,
     StackDivider,
     Image,
     Badge,
     SimpleGrid,
     Breadcrumb,
     Box,
     BreadcrumbItem,
     BreadcrumbLink,
     Flex,
     ButtonGroup,
     ScaleFade
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import AlertConfirmation from "../components/atomic/alertConfirmation/alertConfirmation";
import format from "../helpers/dateFormat";
import Lottie from "lottie-react";
import trashIcon from '../assets/lotties/trash.json';
import Head from "../helpers/headTitle";
import AlertModalForm from "../components/atomic/alertModalForm/AlertModalForm";
import withRoleGuard from "../helpers/roleGuard";

const TransactionDetail = () => {
     const [orderDetails, setOrderDetails] = useState([]);
     const [orderSummary, setOrderSummary] = useState([]);
     const [roomTypeImage, setRoomTypeImage] = useState([]);
     const [roomNumbers, setRoomNumbers] = useState([]);
     const [orderNumber, setOrderNumber] = useState("");
     const [orderName, setOrderName] = useState("");
     const [orderEmail, setOrderEmail] = useState("");
     const [guestName, setGuestName] = useState("");
     const [formErr, setFormErr] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
     const [isOpenModal, setIsOpenModal] = useState(false);
     const [animation, setAnimation] = useState(false)
     const apiURL = import.meta.env.VITE_API_URL;
     const navigate = useNavigate()
     const { id } = useParams();

     const handleChange = (prop) => (e) => {
          if (orderName === "" || orderEmail === "" || guestName === "") {
               setFormErr(true);
          } else {
               setFormErr(false);
          }

          if (prop === 'order_name') {
               setOrderName(e.target.value);
               
          }
          if (prop === 'order_email') {
               setOrderEmail(e.target.value);
          }
          if (prop === 'guest_name') {
               setGuestName(e.target.value);
          }
     }

     const deleteTransaction = async (id) => {
          try {
               const response = await fetch(`${apiURL}/order/delete/${id}`, {
                    method: "DELETE",
               });
               const data = await response.json();
               if (response.ok) {
                    setAnimation(true)
               }
          } catch (error) {
               console.log("Error deleting transaction:", error);
          }
     };

     const updateReq = {
          ...(orderName && { order_name: orderName }),
          ...(orderEmail && { order_email: orderEmail }),
          ...(guestName && { guest_name: guestName })
        }

     const updateTransaction = async (id) => {
          try {
               const update = await fetch(`${apiURL}/order/edit/${id}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateReq),
               });
               const data = await update.json();
               console.log(data)
               if (update.ok) {
                    window.location.reload()
               }
          } catch (error) {
               console.log("Error updating transaction:", error);
          }
     }

     const handleOpenAlert = () => {
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const goBack = () => {
          setAnimation(false);
          navigate('/transaction')
     }

     const handleOpenModal = () => {
          setIsOpenModal(true);
     }

     const handleCloseModal = () => {
          setIsOpenModal(false);
     }

     useEffect(() => {
          async function fetchOrderDetails() {
               try {
                    const orderDetails = await fetch(`${apiURL}/order/find-ordernumber/${id}`);
                    const orderDetail = await orderDetails.json();
                    const roomTypeImage = await fetch(`${apiURL}/room-type/${orderDetail.orderData.id_room_type}`);
                    const roomImage = await roomTypeImage.json();
                    setOrderDetails(orderDetail.orderData);
                    setOrderNumber(orderDetail.orderSummary.order_number);
                    setRoomNumbers(orderDetail.orderSummary.room_numbers);
                    setOrderSummary(orderDetail.orderSummary);
                    setRoomTypeImage(roomImage.data);
               } catch (error) {
                    console.log("Error fetching transaction:", error);
               }
          }
          fetchOrderDetails();
     }, []);

     const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: trashIcon,
          rendererSettings: {
               preserveAspectRatio: "xMidYMid slice"
          }
     }

     const style = {
          height: 300,
          width: 300,
     };

     return (
          <div>
               <Head title={orderNumber} description={''} />
               <Sidebar>
                    <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
                         <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                              Dashboard
                         </Text>
                    </Flex>

                    <Flex h="20" alignItems="flex-start" mx="29px" justifyContent="space-between">
                         <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                              Transaction Detail
                         </Text>
                    </Flex>

                    <Breadcrumb spacing="10px" margin={7} separator={<AiOutlineRight />}>
                         <BreadcrumbItem>
                              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem>
                              <BreadcrumbLink href="#">Transaction</BreadcrumbLink>
                         </BreadcrumbItem>

                         <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink href="#">Transaction Details</BreadcrumbLink>
                         </BreadcrumbItem>
                    </Breadcrumb>

                    {animation ?
                         <>
                              <ScaleFade in={animation}>
                                   <Flex justifyContent="center" alignItems="center" >
                                        <Lottie animationData={trashIcon} autoplay={true} loop={true} style={style} />
                                   </Flex>
                                   <Text fontSize="24px" fontFamily="monospace" fontWeight="thin" mt={12}>
                                        Success Delete Transaction
                                   </Text>
                                   <ButtonGroup mt={12}>
                                        <Button onClick={() => goBack()}>Go Back</Button>
                                   </ButtonGroup>
                              </ScaleFade>
                         </>
                         :
                         <Stack spacing={6} margin={7}>
                              <Box borderWidth="1px" p="4">
                                   <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mt={3}>
                                        Order Data
                                   </Text>

                                   <SimpleGrid py={{ base: 18, md: 5 }}>
                                        <Flex ml={8} alignItems={""}>
                                             <Image
                                                  rounded={"md"}
                                                  alt={"product image"}
                                                  src={`${apiURL}/images/room/${roomTypeImage.photo}`}
                                                  fit={"cover"}
                                                  mr={5}
                                                  align={"center"}
                                                  w={"25%"}
                                                  h={{ base: "100%", sm: "150px", lg: "250" }}
                                             />
                                             <SimpleGrid columns={{ base: 2, md: 3 }} spacing={12}>
                                                  <Card>
                                                       <CardBody>
                                                            <Stack divider={<StackDivider />} spacing="4" >
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           ID
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {orderDetails.id}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Order Number
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {orderDetails.order_number}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Order Name
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {orderDetails.order_name}
                                                                      </Text>
                                                                 </Box>
                                                            </Stack>
                                                       </CardBody>
                                                  </Card>
                                                  <Card>
                                                       <CardBody>
                                                            <Stack divider={<StackDivider />} spacing="4">
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Order E-Mail
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {orderDetails.order_email}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Order Status
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {(() => {
                                                                                switch (orderDetails.order_status) {
                                                                                     case "Default":
                                                                                          return (
                                                                                               <Badge alignContent={"center"}>
                                                                                                    Default
                                                                                               </Badge>
                                                                                          );
                                                                                     case "NEW":
                                                                                          return (
                                                                                               <Badge colorScheme="green">NEW</Badge>
                                                                                          );
                                                                                     case "CHECK-IN":
                                                                                          return (
                                                                                               <Badge colorScheme="yellow">
                                                                                                    CHECK-IN
                                                                                               </Badge>
                                                                                          );
                                                                                     case "CHECK-OUT":
                                                                                          return (
                                                                                               <Badge colorScheme="red">
                                                                                                    CHECK-OUT
                                                                                               </Badge>
                                                                                          );
                                                                                     default:
                                                                                          return (
                                                                                               <Badge>
                                                                                                    {orderDetails.order_status}
                                                                                               </Badge>
                                                                                          );
                                                                                }
                                                                           })()}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Guest Name
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {orderDetails.guest_name}
                                                                      </Text>
                                                                 </Box>
                                                            </Stack>
                                                       </CardBody>
                                                  </Card>
                                                  <Card>
                                                       <CardBody>
                                                            <Stack divider={<StackDivider />} spacing="4">
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Check-In Date
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {format.formatDate(orderDetails.checkin_date)}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Check-out Date
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {format.formatDate(orderDetails.checkout_date)}
                                                                      </Text>
                                                                 </Box>
                                                                 <Box>
                                                                      <Heading size="xs" textTransform="uppercase">
                                                                           Order Date
                                                                      </Heading>
                                                                      <Text pt="2" fontSize="sm">
                                                                           {format.formatDateWithTime(orderDetails.order_date)}
                                                                      </Text>
                                                                 </Box>
                                                            </Stack>
                                                       </CardBody>
                                                  </Card>
                                             </SimpleGrid>
                                        </Flex>
                                   </SimpleGrid>

                                   <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mt={5}>
                                        Order Summary
                                   </Text>

                                   <Flex justifyContent={"space-between"} mt={4}>
                                        <Card>
                                             <CardBody>
                                                  <Stack divider={<StackDivider />} spacing="4">
                                                       <Box>
                                                            <Heading size="xs" textTransform="uppercase">
                                                                 Room Count
                                                            </Heading>
                                                            <Text pt="2" fontSize="sm">
                                                                 {orderDetails.room_count}
                                                            </Text>
                                                       </Box>
                                                  </Stack>
                                             </CardBody>
                                        </Card>
                                        <Card>
                                             <CardBody>
                                                  <Stack divider={<StackDivider />} spacing="4">
                                                       <Box>
                                                            <Heading size="xs" textTransform="uppercase">
                                                                 Room Numbers
                                                            </Heading>
                                                            <Text pt="2" fontSize="sm">
                                                                 {roomNumbers.join(", ")}
                                                            </Text>
                                                       </Box>
                                                  </Stack>
                                             </CardBody>
                                        </Card>
                                        <Card>
                                             <CardBody>
                                                  <Stack divider={<StackDivider />} spacing="4">
                                                       <Box>
                                                            <Heading size="xs" textTransform="uppercase">
                                                                 Total Price
                                                            </Heading>
                                                            <Text pt="2" fontSize="sm">
                                                                 ${orderSummary.price}
                                                            </Text>
                                                       </Box>
                                                  </Stack>
                                             </CardBody>
                                        </Card>
                                   </Flex>
                              </Box>
                              <ButtonGroup spacing={4} width={"100%"}>
                                   <Button
                                        variant={"solid"}
                                        flex={1}
                                        size="sm"
                                        onClick={() =>
                                             window.open(`${apiURL}/invoices/${orderNumber}.pdf`, "_blank")
                                        }
                                   >
                                        View Invoice
                                   </Button>
                                   <Button variant={"solid"} colorScheme={"blue"} flex={1} size="sm" onClick={() => handleOpenModal()}>
                                        Edit
                                   </Button>
                                   { localStorage.getItem("role") === "ADMIN" ?
                                   <Button variant={"solid"} colorScheme={"red"} flex={1} size="sm" onClick={() => handleOpenAlert()}>
                                        Delete
                                   </Button>
                                   : null
                                   }
                              </ButtonGroup>
                         </Stack> 
                    } 
               </Sidebar>

               <AlertConfirmation
                    isOpen={isOpen}
                    onClose={handleCloseAlert}
                    title={"Delete Transaction"}
                    message={"Are you sure you want to delete this transaction data?"}
                    deleteTransaction={() => deleteTransaction(orderDetails.order_number)}
               />

               <AlertModalForm
                    isOpen={isOpenModal}
                    onOpen={handleOpenModal}
                    onClose={handleCloseModal}
                    title={"Edit Order Data"}
                    orderId={orderDetails.id}
                    updateTransaction={() => updateTransaction(orderDetails.id)}
                    handleChange={handleChange}
                    orderName={orderDetails.order_name}
                    orderEmail={orderDetails.order_email}
                    guestName={orderDetails.guest_name}      
                    formErr={formErr}
               />
          </div>
     );
};

export default withRoleGuard(TransactionDetail, ["ADMIN", "RECEPTIONIST"]);;
