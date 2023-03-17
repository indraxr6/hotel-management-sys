import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
  Box
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Head from "../helpers/headTitle";
import UserContext from "../hooks/useContext";


const Login = () => {
  const { setUser } = useContext(UserContext)
  const [login, setLogin] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  //make a function so when user press enter, it triggers login button
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrMessage('');
  };

  const loginReq = {
    email: email,
    password: password,
  }

  // useEffect(() => {
  //   const handleLogout = () => {
  //     localStorage.clear();
  //   };
  //   handleLogout();

  // }, [])

  const handleLogin = async () => {
    if (!email || !password) {
      setInvalid(true);
      setErrMessage('Please fill in all fields');
      return
    }

    const response = await fetch(`${apiURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginReq)
    });
    if (!response.ok) {
      const error = await response.json();
      setInvalid(true);
      setErrMessage(error.message);
      return
    }
    const loginData = await response.json();
    const user = loginData.data.userData
    console.log(loginData);
    setUser(user)

    if (user.role === 'ADMIN' || user.role === 'RECEPTIONIST' || user.role === 'SUPERADMIN') {
      navigate('/dashboard');
    } else {
      navigate('/room-types');
    }

    localStorage.setItem('name', user.name);
    localStorage.setItem('id', user.id);
    localStorage.setItem('photo', user.photo);
    localStorage.setItem('role', user.role);
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', loginData.token);
  }

  return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Head title={"Login"} description={""} />
        
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" errorBorderColor="crimson" value={email} onChange={handleEmailChange} onKeyPress={handleKeyPress} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" errorBorderColor="crimson" value={password} onChange={handlePasswordChange} onKeyPress={handleKeyPress} />
            </FormControl>
            <Text color="crimson" fontSize="sm" fontWeight="regular" textAlign="left">{invalid ? errMessage : null}</Text>

            {/* <Text>int</Text> */}
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Tooltip label={'Pro tip: pls remember your password'}>
                  <Link color={"blue.500"}>Forgot password?</Link>
                </Tooltip>
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"} onClick={() => handleLogin()}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
  );
}

export default Login
