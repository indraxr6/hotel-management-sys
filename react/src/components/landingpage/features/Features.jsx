import {
     Box,
     Button,
     Container,
     Flex,
     Heading,
     Icon,
     Stack,
     Text,
     useColorModeValue,
} from '@chakra-ui/react';
import {

     FcCollaboration,
     FcManager,
     FcMoneyTransfer,
     FcPodiumWithSpeaker,
     FcVip,
} from 'react-icons/fc';



const Card = ({ heading, description, icon, href }) => {
     return (
          <Box
               maxW={{ base: 'full', md: '275px' }}
               w={'full'}
               borderWidth="1px"
               borderRadius="lg"
               overflow="hidden"
               p={5}>
               <Stack align={'start'} spacing={2}>
                    <Flex
                         w={16}
                         h={16}
                         align={'center'}
                         justify={'center'}
                         color={'white'}
                         rounded={'full'}
                         bg={useColorModeValue('gray.100', 'gray.700')}>
                         {icon}
                    </Flex>
                    <Box mt={2}>
                         <Heading size="md">{heading}</Heading>
                         <Text mt={1} fontSize={'sm'}>
                              {description}
                         </Text>
                    </Box>
                    <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                         Learn more
                    </Button>
               </Stack>
          </Box>
     );
};

export default function Features() {
     return (
          <Box p={4} mt={28} mb={28}>
               <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                    <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                         Exceptional Features of Slanda Hotel
                    </Heading>
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'lg' }}>
                         At our hotel, we take pride in providing exceptional services and amenities to ensure that 
                         our guests have a comfortable and memorable stay. Here are five reliable features that we offer
                    </Text>
               </Stack>

               <Container maxW={'5xl'} mt={12}>
                    <Flex flexWrap="wrap" gridGap={6} justify="center" textAlign={'left'}>
                         <Card
                              heading={'Accommodations'}
                              icon={<Icon as={FcVip} w={10} h={10} />}
                              description={
                                   'Our rooms are designed with modern amenities and plush bedding to provide a comfortable and luxurious stay.'
                              }
                              href={'#'}
                         
                         />
                         <Card
                              heading={'Personalized Service'}
                              icon={<Icon as={FcCollaboration} w={10} h={10} />}
                              description={
                                   'Our staff provides personalized service to ensure that your stay is tailored to your specific needs and preferences.'
                              }
                              href={'#'}
                         />
                         <Card
                              heading={'Competitive Pricing'}
                              icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
                              description={
                                   'Our hotel offers affordable rates without compromising on luxury and quality.'
                              }
                              href={'#'}
                         />
                         <Card
                              heading={'Friendly Staff'}
                              icon={<Icon as={FcManager} w={10} h={10} />}
                              description={
                                   ' Our friendly and attentive staff is always ready to assist you with any request or inquiry during your stay.'
                              }
                              href={'#'}
                         />
                         <Card
                              heading={'Delicious Dining'}
                              icon={<Icon as={FcPodiumWithSpeaker} w={10} h={10} />}
                              description={
                                   'Our hotel offers a range of dining options, including affordable yet delicious options, to satisfy your cravings.'
                              }
                              href={'#'}
                         />
                    </Flex>
               </Container>
          </Box>
     );
}