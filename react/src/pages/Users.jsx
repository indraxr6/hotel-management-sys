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
import { MdAdminPanelSettings } from "react-icons/md";
import AlertConfirmation from "../components/atomic/alertConfirmation/alertConfirmation";
import RoleBadge from "../components/atomic/roleTag/RoleTag";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setselectedUser] = useState("");

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const apiURL = import.meta.env.VITE_API_URL;

  const filteredUserData = userData.filter(
    (tb) =>
      tb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tb.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const role = {
    role: "ADMIN"
  }

  const handleOpenAlert = (id) => {
    setselectedUser(id)
    setIsOpen(true);
  };

  const handleOpenAlertDelete = (id) => {
    setselectedUser(id)
    setIsOpenDelete(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
    setIsOpenDelete(false)
  };


  const makeAsAdmin = async () => {
    try {
      const res = await fetch(`${apiURL}/user/editrole/${selectedUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
      })
      const data = await res.json()
      if (res.ok) {
        window.location.reload()
        setselectedUser("")
      }
    } catch (err) {
      console.log(err);
    }
  }

  const deleteUser = async () => {
    try {
      const res = await fetch(`${apiURL}/user/delete/${selectedUser}`, {
        method: 'DELETE',

      })
      const data = await res.json()
      if (res.ok) {
        window.location.reload()
        setselectedUser("")

      }
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

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
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Users</BreadcrumbLink>
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
                {localStorage.getItem("role") === "SUPERADMIN" ? <Th>Action</Th> : null}
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
                      <RoleBadge role={tb.role} />
                    </Td>

                    {localStorage.getItem('role') === 'SUPERADMIN' ?
                      <Td>
                        {tb.id === localStorage.getItem('id') ?
                          <RoleBadge role={'YOU'}/>
                          :
                          <ButtonGroup spacing={3} width={"70%"}>
                            { tb.role === 'RECEPTIONIST' ?
                            <Tooltip hasArrow label={'Make as Admin'}>
                              <Button
                                variant={"solid"}
                                colorScheme={"blue"}
                                flex={1}
                                size="sm"
                                onClick={() => handleOpenAlert(tb.id)}
                              >
                                <MdAdminPanelSettings size={18} />
                              </Button>
                            </Tooltip>
                            :
                            <Tooltip hasArrow label={'Make as Receptionist'}>
                              <Button
                                variant={"solid"}
                                colorScheme={"green"}
                                flex={1}
                                size="sm"
                                onClick={() => handleOpenAlert(tb.id)}
                              >
                                <MdAdminPanelSettings size={18} />
                              </Button>
                            </Tooltip>
                            }

                            <Tooltip hasArrow label={'Delete'}>
                              <Button
                                variant={"solid"}
                                colorScheme={"red"}
                                flex={1}
                                size="sm"
                                onClick={() => handleOpenAlertDelete(tb.id)}
                              >
                                <AiOutlineDelete size={18} />
                              </Button>
                            </Tooltip>
                          </ButtonGroup>
                        }
                      </Td>
                      :
                      null
                    }
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Sidebar>
      <AlertConfirmation
        isOpen={isOpen}
        onClose={handleCloseAlert}
        title={"Confirmation"}
        message={"Are you sure to make this user as an admin?"}
        makeAsAdmin={makeAsAdmin}
        type={'add'}
      />
      <AlertConfirmation
        isOpen={isOpenDelete}
        onClose={handleCloseAlert}
        title={"Confirmation"}
        message={"Are you sure delete this user?"}
        deleteUser={deleteUser}
        type={'delete'}
      />
    </div>
  );
};

export default withRoleGuard(Users, ["ADMIN", "RECEPTIONIST", "SUPERADMIN"]);;
