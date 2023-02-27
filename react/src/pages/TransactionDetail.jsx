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
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { useParams } from "react-router";
import format from "../helpers/dateFormat";

const TransactionDetail = () => {
     const [orderDetails, setOrderDetails] = useState([]);
     const [orderSummary, setOrderSummary] = useState([]);
     const [roomTypeImage, setRoomTypeImage] = useState([]);
     const [roomNumbers, setRoomNumbers] = useState([]);
     const [orderNumber, setOrderNumber] = useState("");
     const apiURL = import.meta.env.VITE_API_URL;
     const { id } = useParams();

     useEffect(() => {
          async function fetchOrderDetails() {
               try {
                    const orderDetails = await fetch(`${apiURL}/order/find-ordernumber/${id}`);
                    const orderDetail = await orderDetails.json();
                    const roomTypeImage = await fetch(
                         `${apiURL}/room-type/${orderDetail.orderData.id_room_type}`
                    );
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

     console.log(orderNumber);

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
                                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0}>
                                             <Card>
                                                  <CardBody>
                                                       <Stack divider={<StackDivider />} spacing="4">
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

                              <Flex justifyContent={"space-between"}>
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
                                   Download Invoice
                              </Button>
                              <Button variant={"solid"} colorScheme={"blue"} flex={1} size="sm">
                                   Edit
                              </Button>
                              <Button variant={"solid"} colorScheme={"red"} flex={1} size="sm">
                                   Delete
                              </Button>
                         </ButtonGroup>
                    </Stack>
               </Sidebar>
          </div>
     );
};

export default TransactionDetail;
