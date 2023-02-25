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
     Breadcrumb, BreadcrumbItem, BreadcrumbLink, useListStyles
} from '@chakra-ui/react';
import Sidebar from '../components/sidebar/Sidebar'
import { AiOutlineRight } from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import BackButton from '../components/atomic/backArrow/BackArrow';


export default function RoomTypeDetail() {
     const [roomDetails, setRoomDetails] = useState([]);
     const [facilities, setFacilities] = useState([]);
     const apiURL = import.meta.env.VITE_API_URL
     const { id } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          async function fetchRoomTypes() {
               try {
                    const response = await fetch(`${apiURL}/room-type/${id}`);
                    const data = await response.json();
                    setRoomDetails(data.data);
                    setFacilities(data.facilities);
               } catch (error) {
                    console.log('Error fetching room type data:', error);
               }
          }
          fetchRoomTypes();
     }, []);

     return (
          <Sidebar>                   
               <Container  alignItems={'flex-start'} justifyContent="flex-start">
                    <BackButton />
               </Container> 
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


                                             {/*                     
                                        <List spacing={2}>
                                             <ListItem>Chronograph</ListItem>
                                             <ListItem>Master Chronometer Certified</ListItem>{' '}
                                             <ListItem>Tachymeter</ListItem>
                                        </List>
                                        
                                        <List spacing={2}>
                                             <ListItem>Anti‑magnetic</ListItem>
                                             <ListItem>Chronometer</ListItem>
                                             <ListItem>Small seconds</ListItem>
                                        </List> */}


                                        </SimpleGrid>
                                   </Box>

                              </Stack>

                              <Button
                                   rounded={'none'}
                                   w={'full'}
                                   mt={8}
                                   size={'lg'}
                                   py={'7'}
                                   bg={useColorModeValue('gray.900', 'gray.50')}
                                   color={useColorModeValue('white', 'gray.900')}
                                   textTransform={'uppercase'}
                                   _hover={{
                                        transform: 'translateY(2px)',
                                        boxShadow: 'lg',
                                   }}>
                                   Add to cart
                              </Button>
                         </Stack>
                    </SimpleGrid>
               </Container>




          </Sidebar>


     );
}