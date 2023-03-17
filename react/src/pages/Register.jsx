import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  ScaleFade,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Head from '../helpers/headTitle';
import { useNavigate } from 'react-router';
import successIcon from '../assets/lotties/success.json';
import Lottie from "lottie-react";


export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [file, setFile] = useState(null)
  const [invalid, setInvalid] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const apiURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()


  const registerReq = {
    name: firstName + ' ' + lastName,
    email: email,
    password: password,
    photo: "default.png"
  }

  const proceed = () => {
    setAnimation(false)
    navigate('/login')
  }

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  const handleRegister = async () => {
    if (!firstName || !email || !password || !lastName) {
      setErrMessage('Please fill in all required fields')
      return
    }
    try {
      const response = await fetch(`${apiURL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerReq),
      });
      const data = await response.json();
      console.log(data)
      if(response.ok) {
        setAnimation(true)
      }
    } catch (err) {
      console.log(err);
      setErrMessage(err.message)
    }
  }

  const style = {
    height: 400,
    width: 400,
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      {animation ?
        <>
          <ScaleFade in={animation}>
            <Flex justifyContent="center" alignItems="center" >
              <Lottie animationData={successIcon} autoplay={true} loop={true} style={style} />
            </Flex>
            <Text fontSize="24px" fontFamily="monospace" fontWeight="thin" mb={5}>
              Register Success
            </Text>
            <Button onClick={proceed}>Proceed to Login</Button>
          </ScaleFade>
        </> 
        :
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Head title={'Register'} description={''} />
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text> */}
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              {/* <FormControl id="photo" isRequired>
              <FormLabel>Photo</FormLabel>
              <Input type="file" onChange={handleFileChange}/>
            </FormControl> */}
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={3}>
                <Button
                  loadingText="Submitting"
                  onClick={handleRegister}
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              {/* <Text color="crimson" fontSize="sm" fontWeight="regular" textAlign="left">{invalid ? errMessage : null}</Text> */}
              {errMessage ?
                <Text color="crimson" fontSize="sm" fontWeight="regular" textAlign="left">{errMessage}</Text>
                : null
              }
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={() => navigate('/login')}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      }
    </Flex>

  );
}