import React from 'react'

const InquiryResult = ({}) => {
  return (
    <div>
      <FormControl>
        <Flex>
          <Wrap m={5}>
            <FormLabel>Order Number</FormLabel>
            <Input type='text' value={orderNumber} readOnly />
            <FormLabel>Order Name</FormLabel>
            <Input type='text' value={orderName} readOnly />
            <FormLabel>Order Email</FormLabel>
            <Input type='text' value={orderEmail} readOnly />
            <FormLabel>Order Date</FormLabel>
            <Input type='text' value={format.formatDateWithTime(orderDate)} readOnly />
            <FormLabel>Guest Name</FormLabel>
            <Input type='text' value={guestName} readOnly />
            <FormLabel>Guest Name</FormLabel>
            <Input type='text' value={guestName} readOnly />
          </Wrap>

          <Wrap m={5}>
            <FormLabel>Check-In Date</FormLabel>
            <Input type='text' value={format.formatDate(checkinDate)} readOnly />
            <FormLabel>Check-Out Date</FormLabel>
            <Input type='text' value={format.formatDate(checkoutDate)} readOnly />
            <FormLabel>Order Status</FormLabel>
            <Input type='text' value={orderStatus} readOnly />
            <FormLabel>Room Type</FormLabel>
            <Input type='number' value={roomType} readOnly />
            <FormLabel>Room Numbers</FormLabel>
            <Input type='text' value={roomNumber} readOnly />
            <FormLabel>Amount to Pay</FormLabel>
            <Input type='text' value={`$${orderTotal}`} readOnly />
          </Wrap>
        </Flex>
      </FormControl>
      <br />
      <ButtonGroup spacing={5} width={'70%'}>
        <Button flex={1} colorScheme="blue" onClick={handleSubmit}>
          Check-In
        </Button>
        <Button colorScheme="red" flex={1} onClick={handleReset}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default InquiryResult