import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
  ButtonGroup,
  ScaleFade,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import Head from "../helpers/headTitle";
import { AiOutlineRight } from "react-icons/ai";
import AlertStatus from "../components/atomic/alertStatus/AlertStatus";
import format from "../helpers/dateFormat";
import AlertModal from "../components/atomic/alertModal/AlertModal";
import withRoleGuard from "../helpers/roleGuard";

const CheckOrder = (props) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [roomNumber, setRoomNumber] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setOrderNumber(e.target.value);
    setErrMessage("");
    setMessage("");

    if (guestName) {
      setErrMessage(errMessage);
      setMessage(message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleReset = () => {
    setOrderNumber("");
    setGuestName("");
    setErrMessage("");
    setMessage("");
  };

  const handleOpenAlert = () => {
    setIsOpen(true);
  };
  const handleOpenAlertCancel = () => {
    setIsOpenCancel(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
  };
  

  const handleCloseAlertCancel = () => {
    setIsOpenCancel(false);
  };


  const handleSubmit = async () => {
    try {
      const res = await fetch(`${apiURL}/order/find-ordernumber/${orderNumber}`);
      const data = await res.json();

      if (res.status == 404) {
        setErrMessage(data.message);
        setMessage("");
        setGuestName("");
      } else if (data) {
        const roomTypeName = await fetch(`${apiURL}/room-type/${data.orderData.id_room_type}`);
        const roomName = await roomTypeName.json();
        setMessage(data.message);
        setOrderName(data.orderData.order_name);
        setOrderEmail(data.orderData.order_email);
        setGuestName(data.orderData.guest_name);
        setOrderDate(data.orderData.order_date);
        setCheckinDate(data.orderData.checkin_date);
        setCheckoutDate(data.orderData.checkout_date);
        setOrderStatus(data.orderData.order_status);
        setRoomType(roomName.data.room_type_name)
        setOrderTotal(data.orderSummary.price);
        setRoomNumber(data.orderSummary.room_numbers);
        setErrMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const res = await fetch(`${apiURL}/order/change-status/${orderNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status:
            orderStatus == "NEW"
              ? "CHECK-IN"
              : orderStatus == "CHECK-IN"
                ? "CHECK-OUT"
                : orderStatus == "CHECK-OUT"
                  ? "CHECK-IN"
                  : "CHECK-IN",
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status == 404) {
        setErrMessage(data.message);
        setMessage("");
      } else if (data) {
        setMessage(data.message);
        setErrMessage("");
        setOrderStatus(data.orderData.order_status);
        setGuestName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusCancel = async () => {
    try {
      const res = await fetch(`${apiURL}/order/change-status/${orderNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 'CANCEL'
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status == 404) {
        setErrMessage(data.message);
        setMessage("");
      } else if (data) {
        setMessage(data.message);
        setErrMessage("");
        setOrderStatus(data.orderData.order_status);
        setGuestName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head title='Check Order' description={''} />
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
            Check Order
          </Text>
        </Flex>

        <Breadcrumb spacing="10px" margin={7} separator={<AiOutlineRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Check Order</BreadcrumbLink>
          </BreadcrumbItem>


        </Breadcrumb>

        <Stack spacing={6} margin={7}>
          <Box borderWidth="1px" p="4">
            <VStack spacing={6} width={"9xl"} margin={7}>
              <FormControl>
                <FormLabel>Insert order number to find transaction.</FormLabel>
                <Text textAlign={"left"}></Text>
                <Input
                  placeholder="Insert order number"
                  value={orderNumber}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <ButtonGroup spacing={5} width={"100%"}>
                <Button flex={1} colorScheme="blue" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button
                  colorScheme="blue"
                  variant={"outline"}
                  flex={1}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </VStack>

            <Stack spacing={6} width={"9xl"} margin={7}>
              <ScaleFade in={message || errMessage}>
                <AlertStatus errMessage={errMessage} message={message} />
              </ScaleFade>
            </Stack>
          </Box>
        </Stack>

        <Stack spacing={6} margin={7}>
          {guestName && orderStatus !== 'CANCEL' ? (
            <Box borderWidth="1px" p="4">
              <Text
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                textAlign={"left"}
                m={5}
              >
                Inquiry Details
              </Text>
              <ScaleFade in={message || errMessage}>
                <Box width={"100%"}>
                  <FormControl>
                    <Flex>
                      <Wrap m={5}>
                        <FormLabel>Order Number</FormLabel>
                        <Input type="text" value={orderNumber} readOnly />
                        <FormLabel>Order Name</FormLabel>
                        <Input type="text" value={orderName} readOnly />
                        <FormLabel>Order Email</FormLabel>
                        <Input type="text" value={orderEmail} readOnly />
                        <FormLabel>Order Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDateWithTime(orderDate)}
                          readOnly
                        />
                        <FormLabel>Guest Name</FormLabel>
                        <Input type="text" value={guestName} readOnly />
                      </Wrap>

                      <Wrap m={5}>
                        <FormLabel>Check-In Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDate(checkinDate)}
                          readOnly
                        />
                        <FormLabel>Check-Out Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDate(checkoutDate)}
                          readOnly
                        />
                        <FormLabel>Order Status</FormLabel>
                        <Input type="text" value={orderStatus} readOnly />
                        <FormLabel>Room Type</FormLabel>
                        <Input type="text" value={roomType} readOnly />
                        <FormLabel>Room Numbers</FormLabel>
                        <Input type="text" value={roomNumber.join(", ")} readOnly />
                      </Wrap>
                    </Flex>
                    <Wrap m={5}>
                      <FormLabel>Amount to Pay</FormLabel>
                      <Input type="text" value={`$${orderTotal}`} readOnly />
                    </Wrap>
                  </FormControl>

                  <br />

                  {orderStatus == "CHECK-OUT" ? (
                    <Button
                      colorScheme="red"
                      variant={"outline"}
                      flex={1}
                      onClick={handleStatusChange && handleOpenAlert}
                    >
                      Rollback
                    </Button>
                  ) : (
                    <ButtonGroup spacing={5} width={"70%"}>
                      <Button
                        flex={1}
                        colorScheme={
                          orderStatus == "NEW"
                            ? "green"
                            : orderStatus == "CHECK-IN"
                              ? "blue"
                              : ""
                        }
                        onClick={handleStatusChange && handleOpenAlert}
                      >
                        {orderStatus == "NEW"
                          ? "Check-In"
                          : orderStatus == "CHECK-IN"
                            ? "Check-Out"
                            : ""}
                      </Button>
                      <Button colorScheme="red" flex={1} onClick={handleStatusCancel && handleOpenAlertCancel}>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  )}
                </Box>
              </ScaleFade>
            </Box>
          ) : (
            ""
          )}
          <AlertModal
            isOpen={isOpen}
            onClose={handleCloseAlert}
            handleStatusChange={handleStatusChange}
            handleOpenAlert={handleOpenAlert}
            title={'Change Status'}
            message={orderStatus == "NEW" ? "Are you sure want to check-in this order?" : "Are you sure want to check-out this order?"}
            type={'add'}

          />

          <AlertModal
            isOpen={isOpenCancel}
            onClose={handleCloseAlertCancel}
            handleStatusCancel={handleStatusCancel}
            // handleOpenAlertCancel={handleOpenAlertCancel}
            // handleCloseAlertCancel={handleCloseAlertCancel}
            title={"Cancel Order"}
            message={"Are you sure want to cancel this order?"}
            type={'delete'}
          />

        </Stack>
      </Sidebar>
    </div>
  );
};

export default withRoleGuard(CheckOrder, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);

