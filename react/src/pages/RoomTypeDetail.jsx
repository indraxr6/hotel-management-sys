import {
     Box,
     chakra,
     Container,
     Stack,
     Text,
     Image,
     Flex,
     VStack,
     Button,
     Heading,
     SimpleGrid,
     StackDivider,
     useColorModeValue,
     List,
     ListItem,
     Breadcrumb, BreadcrumbItem, BreadcrumbLink, useListStyles, ButtonGroup, ScaleFade
} from '@chakra-ui/react';
import Sidebar from '../components/sidebar/Sidebar'
import { AiOutlineRight } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import BackButton from '../components/atomic/backArrow/BackArrow';
import Head from '../helpers/headTitle';
import withRoleGuard from '../helpers/roleGuard';
import AlertConfirmation from '../components/atomic/alertConfirmation/alertConfirmation'
import Lottie from "lottie-react";
import trashIcon from '../assets/lotties/trash.json';


const RoomTypeDetail = () => {
     const [roomDetails, setRoomDetails] = useState([]);
     const [facilities, setFacilities] = useState([]);
     const [isOpen, setIsOpen] = useState(false)
     const [animation, setAnimation] = useState(false)

     const apiURL = import.meta.env.VITE_API_URL
     const { id } = useParams()
     const navigate = useNavigate()


     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch(`${apiURL}/room-type/${id}`);
                    const data = await response.json();
                    // if (!response.ok) {
                    //      navigate("/notfound")
                    // }
                    setRoomDetails(data.data);
                    setFacilities(data.facilities);
               } catch (error) {
                    console.log('Error fetching room type data:', error);
               }
          }
          fetchRoomTypes();
     }, []);

     const handleEdit = (id) => {
          navigate(`/room-types/edit/${id}`)
     }

     const handleOpenAlert = () => {
          setIsOpen(true);
     };

     const handleCloseAlert = () => {
          setIsOpen(false);
     };

     const goBack = () => {
          setAnimation(false)
          navigate('/room-types')
     }

     const style = {
          height: 400,
          width: 400,
     };

     return (
          <Sidebar>
               <Head title='Room Types' description={''} />

               <Flex h="12" alignItems="flex-start" mx="29px" justifyContent="space-between">
                    <BackButton />
               </Flex>
               <Flex h="5" alignItems="flex-start" mx="31px" justifyContent="space-between">
                    <Text fontSize="14px" fontFamily="monospace" fontWeight="thin">
                         Dashboard
                    </Text>
               </Flex>

               <Flex h="20" alignItems="flex-start" mx="29px" justifyContent="space-between">
                    <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
                         Room Type
                    </Text>
               </Flex>

               <Breadcrumb spacing='10px' margin={8} separator={<AiOutlineRight />}>
                    <BreadcrumbItem>
                         <BreadcrumbLink onClick={() => navigate(-2)} href='#'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                         <BreadcrumbLink onClick={() => navigate(-1)} href='#'>Room Types</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                         <BreadcrumbLink>{roomDetails.room_type_name}</BreadcrumbLink>
                    </BreadcrumbItem>
               </Breadcrumb>

               {animation ?
                    <>
                         <ScaleFade in={animation}>
                              <Flex justifyContent="center" alignItems="center" >
                                   <Lottie animationData={trashIcon} autoplay={true} loop={true} style={style} />
                              </Flex>
                              <Text fontSize="24px" fontFamily="monospace" fontWeight="thin">
                                   Success Delete Room Type
                              </Text>
                              <ButtonGroup mt={10}>
                                   <Button onClick={() => goBack()}>Go Back</Button>
                              </ButtonGroup>
                         </ScaleFade>
                    </>
                    :
                    <Container maxW={'8xl'} textAlign={'left'}>
                         <SimpleGrid
                              columns={{ base: 1, lg: 2 }}
                              spacing={{ base: 8, md: 10 }}
                              py={{ base: 18, md: 5 }}>
                              <Flex>
                                   <Image
                                        rounded={'md'}
                                        alt={'product image'}
                                        src={`${apiURL}/images/room/${roomDetails.photo}`}
                                        fit={'cover'}
                                        align={'center'}
                                        w={'100%'}
                                        h={{ base: '100%', sm: '400px', lg: '500px' }}

                                   />
                              </Flex>

                              <Stack spacing={{ base: 6, md: 10 }}>
                                   <Box as={'header'}>
                                        <Heading
                                             lineHeight={1.1}
                                             fontWeight={600}
                                             fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                                             mb={2}
                                        >
                                             {roomDetails.room_type_name}
                                        </Heading>
                                        <Text
                                             color={useColorModeValue('gray.900', 'gray.400')}
                                             fontWeight={300}
                                             fontSize={'2xl'}>
                                             ${roomDetails.price}
                                        </Text>
                                   </Box>

                                   <Stack
                                        spacing={{ base: 4, sm: 6 }}
                                        direction={'column'}
                                        divider={
                                             <StackDivider
                                                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                                             />
                                        }>
                                        <VStack spacing={{ base: 4, sm: 6 }}>
                                             <Text
                                                  color={useColorModeValue('gray.500', 'gray.400')}
                                                  fontSize={'2xl'}
                                                  fontWeight={'300'}>
                                                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                                  diam nonumy eirmod tempor invidunt ut labore
                                             </Text>
                                             <Text fontSize={'lg'}>
                                                  {roomDetails.description}
                                             </Text>
                                        </VStack>
                                        <Box>
                                             <Text
                                                  fontSize={{ base: '16px', lg: '18px' }}
                                                  color={useColorModeValue('yellow.500', 'yellow.300')}
                                                  fontWeight={'500'}
                                                  textTransform={'uppercase'}
                                                  mb={'4'}>
                                                  Features
                                             </Text>

                                             <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                                  {facilities.map((facility) => {
                                                       return (
                                                            <List spacing={2}>
                                                                 <ListItem mt={1} mb={1} _before={{ content: "'•'", paddingRight: '0.5em' }}>{facility}</ListItem>
                                                            </List>
                                                       )
                                                  })}
                                             </SimpleGrid>
                                        </Box>
                                   </Stack>
                                   <Button
                                        rounded={'md'}
                                        w={'full'}
                                        mt={8}
                                        size={'lg'}
                                        py={'7'}
                                        bg={useColorModeValue('gray.900', 'gray.50')}
                                        color={useColorModeValue('white', 'gray.900')}
                                        textTransform={'uppercase'}
                                        onClick={() => navigate('/transaction/add')}
                                        _hover={{
                                             transform: 'translateY(2px)',
                                             boxShadow: 'lg',
                                        }}>
                                        Book
                                   </Button>
                                   { localStorage.getItem("role") === "ADMIN" || localStorage.getItem("role") === "SUPERADMIN" ?
                                   <ButtonGroup spacing={5} width={"100%"}>
                                        <Button flex={1} colorScheme="blue" onClick={() => handleEdit(id)}>
                                             Edit
                                        </Button>
                                        <Button colorScheme="red" variant={"outline"} flex={1} onClick={handleOpenAlert}>
                                             Delete
                                        </Button>
                                   </ButtonGroup> : null
                                   }
                              </Stack>
                         </SimpleGrid>
                    </Container>
               }

               <AlertConfirmation
                    isOpen={isOpen}
                    onClose={handleCloseAlert}
                    title={"Delete Room Type"}
                    message={"Are you sure you want to delete this room type?"}
                    deleteRoomType={() => handleDelete(id)}
                    type={'delete'}
               />
          </Sidebar>
     );
}

export default withRoleGuard(RoomTypeDetail, ["ADMIN", "RECEPTIONIST", "SUPERADMIN", "CUSTOMER"]);