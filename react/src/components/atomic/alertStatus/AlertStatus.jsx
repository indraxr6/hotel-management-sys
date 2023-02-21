import React from 'react'
import { Alert, AlertIcon, Fade } from '@chakra-ui/react'

const AlertStatus = ({ errMessage, message }) => {
  if (errMessage) {
    return (
      <Alert status="error" width={"100%"} borderRadius={5}>
        <AlertIcon />
        {errMessage}
      </Alert>
    );
  } else if (message) {
    return (
      <Alert status="success" width={"100%"} borderRadius={5}>
        <AlertIcon />
        {message}
      </Alert>
    );
  } else {
    return null;
  }
}

export default AlertStatus;