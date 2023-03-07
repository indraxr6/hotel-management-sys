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
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Head from "../helpers/headTitle";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginReq = {
    email: email,
    password: password,
  }

  useEffect (() => {
    const handleLogout = () => {
      localStorage.clear();
    };
    handleLogout();
  
  }, [])

  const handleLogin = async() => {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginReq)
    });
    const loginData = await response.json();
    const user = loginData.data.userData
    // console.log(loginData.data.userData);
    
    if (user.role === 'ADMIN' || user.role === 'RECEPTIONIST') {
      navigate('/dashboard');
    } else {
      navigate('/welcome');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    localStorage.setItem('name', user.name);
    localStorage.setItem('id', user.id);
    localStorage.setItem('photo', user.photo);
    localStorage.setItem('role', user.role);  
    localStorage.setItem('token', loginData.token);
  }

  async function fetchWithToken(url, options) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  // Example usage
  async function fetchUserData() {
    const userData = await fetchWithToken("/api/user");
    console.log(userData);
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Head title={"Login"} description={""} />
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
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
