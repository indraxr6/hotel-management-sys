<Stack spacing={6} margin={7}>
          {guestName && orderStatus !== 'CANCEL' ? (
            <Box borderWidth="1px" p="4">
              <Text
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                textAlign={"left"}
                m={5}
              >
                Inquiry Details
              </Text>
                <Box width={"100%"}>
                  <FormControl>
                    <Flex>
                      <Wrap m={5}>
                        <FormLabel>Order Number</FormLabel>
                        <Input type="text" value={orderNumber} readOnly />
                        <FormLabel>Order Name</FormLabel>
                        <Input type="text" value={orderName} readOnly />
                        <FormLabel>Order Email</FormLabel>
                        <Input type="text" value={orderEmail} readOnly />
                        <FormLabel>Order Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDateWithTime(orderDate)}
                          readOnly
                        />
                        <FormLabel>Guest Name</FormLabel>
                        <Input type="text" value={guestName} readOnly />
                      </Wrap>

                      <Wrap m={5}>
                        <FormLabel>Check-In Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDate(checkinDate)}
                          readOnly
                        />
                        <FormLabel>Check-Out Date</FormLabel>
                        <Input
                          type="text"
                          value={format.formatDate(checkoutDate)}
                          readOnly
                        />
                        <FormLabel>Order Status</FormLabel>
                        <Input type="text" value={orderStatus} readOnly />
                        <FormLabel>Room Type</FormLabel>
                        <Input type="number" value={roomType} readOnly />
                        <FormLabel>Room Numbers</FormLabel>
                        <Input type="text" value={roomNumber} readOnly />
                      </Wrap>
                    </Flex>
                    <Wrap m={5}>
                      <FormLabel>Amount to Pay</FormLabel>
                      <Input type="text" value={`$${orderTotal}`} readOnly />
                    </Wrap>
                  </FormControl>

                  <br />

                  {orderStatus == "CHECK-OUT" ? (
                    <Button
                      colorScheme="red"
                      variant={"outline"}
                      flex={1}
                      onClick={handleStatusChange && handleOpenAlert}
                    >
                      Rollback
                    </Button>
                  ) : (
                    <ButtonGroup spacing={5} width={"70%"}>
                      <Button
                        flex={1}
                        colorScheme={
                          orderStatus == "NEW"
                            ? "green"
                            : orderStatus == "CHECK-IN"
                            ? "blue"
                            : ""
                        }
                        onClick={handleStatusChange && handleOpenAlert}
                      >
                        {orderStatus == "NEW"
                          ? "Check-In"
                          : orderStatus == "CHECK-IN"
                          ? "Check-Out"
                          : ""}
                      </Button>
                      <Button colorScheme="red" flex={1} onClick={handleStatusCancel && handleOpenAlertCancel}>
                        Cancel  
                      </Button>
                    </ButtonGroup>
                  )}
                </Box>
            </Box>
          ) : (
            ""
          )}
        </Stack>