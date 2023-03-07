import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import {
  Text,
  Button,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Td,
  Badge,
  TableCaption,
  Breadcrumb,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Avatar,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputRightAddon,
  InputGroup,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";
import Head from "../helpers/headTitle";
import withRoleGuard from "../helpers/roleGuard";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const apiURL = import.meta.env.VITE_API_URL;

  const filteredUserData = userData.filter(
    (tb) =>
      tb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const response = await fetch(`${apiURL}/user`);
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.log("Error fetching room types:", error);
      }
    }

    fetchRoomTypes();
  }, []);

  return (
    <div>
      <Head title='Users List' description={''} />
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
            User Data
          </Text>
        </Flex>

        <Breadcrumb spacing="10px" margin={7} separator={<AiOutlineRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Users</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <TableContainer p={"6"}>
          <FormLabel>Search</FormLabel>
          <Box display="flex" alignItems="center" mb={14}>
            <FormControl>
              <InputGroup>
                <Input
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  width={"40%"}
                />
                <InputRightAddon children={<AiOutlineSearch />} />
              </InputGroup>
            </FormControl>
            <Button
              variant={"solid"}
              colorScheme={"green"}
              size="md"
              fontSize={"sm"}
              mr={6}
            >
              Add User
            </Button>
          </Box>

          <Table variant="simple" colorScheme="twitter">
            <TableCaption>{filteredUserData.length} user found.</TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                {/* <Th>Password</Th> */}
                <Th>Role</Th>
                {localStorage.getItem('role') === 'ADMIN' ? <Th>Action</Th> : null}
              </Tr>
            </Thead>
            <Tbody>
              {filteredUserData.map((tb, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Avatar
                        size={"sm"}
                        src={`${apiURL}/images/profile/${tb.photo}`}
                      />
                    </Td>
                    <Td>{tb.id}</Td>
                    <Td>{tb.name}</Td>
                    <Td>{tb.email}</Td>
                    {/* <Td>{tb.password}</Td> */}

                    <Td>
                      {(() => {
                        switch (tb.role) {
                          case "Default":
                            return (
                              <Badge alignContent={"center"}>Default</Badge>
                            );
                          case "CUSTOMER":
                            return <Badge colorScheme="green">CUSTOMER</Badge>;
                          case "RECEPTIONIST":
                            return (
                              <Badge colorScheme="yellow">RECEPTIONIST</Badge>
                            );
                          case "ADMIN":
                            return <Badge colorScheme="red">ADMIN</Badge>;
                          default:
                            return <Badge>UNKNOWN</Badge>;
                        }
                      })()}
                    </Td>

                    {localStorage.getItem('role') === 'ADMIN' ?
                      <Td>
                        <ButtonGroup spacing={3} width={"70%"}>
                          <Tooltip hasArrow label={'Edit'}>
                            <Button
                              variant={"solid"}
                              colorScheme={"blue"}
                              flex={1}
                              size="sm"
                            >
                              <AiOutlineEdit />
                            </Button>
                          </Tooltip>
                          <Tooltip hasArrow label={'Delete'}>
                            <Button
                              variant={"solid"}
                              colorScheme={"red"}
                              flex={1}
                              size="sm"
                            >
                              <AiOutlineDelete />
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
        </TableContainer>
      </Sidebar>
    </div>
  );
};

export default withRoleGuard(Users, ["ADMIN", "RECEPTIONIST"]);;
