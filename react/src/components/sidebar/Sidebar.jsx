import React, { ReactNode } from 'react';
import logo from '../../assets/images/slanda-logo-notext1.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,

  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiBell,
  FiMoon,
  FiChevronDown,
  FiList,
  FiCreditCard,
  FiUsers,
  FiLogOut
} from 'react-icons/fi';
import { BsDoorOpen } from 'react-icons/bs';
import { MdOutlineFactCheck } from 'react-icons/md';
import LiveClock from '../liveClock/LiveClock';


export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();



  return (
    <Box minH="100vh" bg={useColorModeValue()}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>

  );
}



const LinkItems = [
  { name: 'Home', icon: FiHome, to: '/dashboard' },
  { name: 'Transactions', icon: FiCreditCard, to: '/transaction' },
  { name: 'Order Status', icon: MdOutlineFactCheck, to: '/check-order' },
  { name: 'Users', icon: FiUsers, to: '/users' },
  { name: 'Room List', icon: FiList, to: '/room-list' },
  { name: 'Room Types', icon: BsDoorOpen, to: '/room-types' },
  { name: 'Logout', icon: FiLogOut, to: '/login' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >

      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src={logo} alt="Logo" width={38} mr={1}
            css={localStorage.getItem('chakra-ui-color-mode') === 'light' ? { filter: 'invert(0)' } : { filter: "invert(1)" }}
          />
          <Text fontWeight="regular">Slanda Hotel</Text>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {

  return (
    <Link to={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  const handleThemeChange = () => {
    if (localStorage.getItem('chakra-ui-color-mode') === 'light') {
      localStorage.setItem('chakra-ui-color-mode', 'dark')
      window.location.reload()
    } else {
      localStorage.setItem('chakra-ui-color-mode', 'light')
      window.location.reload()
    }
  }
  const apiURL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>


        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="regular">
          Slanda Hotel
        </Text>


        <HStack spacing={{ base: '2', md: '6' }}>
          <LiveClock />
          <Tooltip hasArrow label={'Switch App Theme'}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiMoon />}
              onClick={() => handleThemeChange()}
            />
          </Tooltip>

          <Tooltip hasArrow label={'This is a bell '}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
          </Tooltip>

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={`${apiURL}/images/profile/${localStorage.getItem("photo")}`}

                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{localStorage.getItem("name")}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {localStorage.getItem("role")}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};