import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { Sidebar } from '../components';
import Head from '../helpers/headTitle';
import Lottie from "lottie-react";
import notFound from '../assets/lotties/notfound.json';
import { useNavigate } from 'react-router';


const NotFound = () => {

     const navigate = useNavigate()

     const style = {
          height: 300,
          width: 300,
     };

     return (
          <div>
               <Head title='Page Not Found' description={''} />
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
                              Page Not Found
                         </Text>
                    </Flex>

                    <Flex justifyContent="center" alignItems="center" >
                         <Lottie animationData={notFound} autoplay={true} loop={true} style={style} />
                    </Flex>
                    <Text fontSize="24px" fontFamily="monospace" fontWeight="thin" mt={5}>
                         This page is not found
                    </Text>

                    <ButtonGroup mt={5}>
                         <Button onClick={() => navigate('/dashboard')}>Go Back</Button>
                    </ButtonGroup>
            
               </Sidebar>
          </div>
     );
}

export default NotFound
