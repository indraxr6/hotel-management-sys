import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Stats from "../components/atomic/stats/Stats";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  TableContainer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Badge,
  Flex,
  Text,
  Tooltip,
  ScaleFade,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import format from "../helpers/dateFormat";
import Head from "../helpers/headTitle";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import withRoleGuard from "../helpers/roleGuard";

const Dashboard = () => {
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const apiURL = import.meta.env.VITE_API_URL;

  const page = 1;
  const limit = 10;

  const handleDetailsClick = (id) => {
    // navigate(`/transaction/${id}`)
    window.open(`/transaction/${id}`, "_blank")
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
        const response = await fetch(`${apiURL}/order/find?${queryParams}`);
        const data = await response.json();
        setOrder(data.transactionData);
        console.log(data.data);
      } catch (error) {
        console.log("Error fetching transaction data:", error);
      }
    }
    fetchTransaction();
  }, [page, limit, startDate, endDate]);

  const Protectedpage = withRoleGuard(Dashboard, "admin");


  return (
    <div>
      <Head title='Dashboard' description={''} />
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
          mx="7"
          justifyContent="space-between"
        >
          <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
            Home
          </Text>
        </Flex>

        <ScaleFade in={true}>
          <Stats />
        </ScaleFade>

        <Breadcrumb spacing="10px" margin={6} separator={<AiOutlineRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <br />
        <ScaleFade in={true}>
          <Text fontSize="xl" fontWeight="Thin">
            10 latest transaction
          </Text>
          <br />
          <TableContainer p={"6"}>
            <Table variant="simple" colorScheme="twitter">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
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
                {order.map((tb, index) => {
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
                              return (
                                <Badge alignContent={"center"}>Default</Badge>
                              );
                            case "NEW":
                              return <Badge colorScheme="green">NEW</Badge>;
                            case "CHECK-IN":
                              return <Badge colorScheme="yellow">CHECK-IN</Badge>;
                            case "CHECK-OUT":
                              return <Badge colorScheme="blue">CHECK-OUT</Badge>;
                            case "CANCEL":
                              return <Badge colorScheme="red">CANCEL</Badge>;
                            default:
                              return <Badge>{tb.order_status}</Badge>;
                          }
                        })()}
                      </Td>

                      <Td>{format.formatDate(tb.checkin_date)}</Td>
                      <Td>

                        <Tooltip hasArrow label={'Open Order Details'}>
                          <Button variant={"outline"} size="sm" onClick={() => handleDetailsClick(tb.order_number)}>
                            <HiOutlineArrowSmRight size={20} />
                          </Button>
                        </Tooltip>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ScaleFade>
      </Sidebar>
    </div>
  );

};

export default withRoleGuard(Dashboard, ["ADMIN", "RECEPTIONIST"]);
