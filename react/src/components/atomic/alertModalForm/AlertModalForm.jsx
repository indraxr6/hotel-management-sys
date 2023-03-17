import React from 'react'
import {
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalFooter,
     ModalBody,
     ModalCloseButton,
     Button,
     FormControl,
     FormLabel,
     Input,
     Select,

} from '@chakra-ui/react'
import AlertStatus from '../alertStatus/AlertStatus'
import { useState } from 'react'

const AlertModalForm = ({ onClose, isOpen, title, updateTransaction, updateRoom, roomType, handleChange, formErr }) => {

     const [emptyField, setEmptyField] = useState(false)

     const initialRef = React.useRef(null)
     const finalRef = React.useRef(null)

     const handleUpdate = () => {
          if (formErr) {
               setEmptyField(true)
               return
          }
          updateTransaction ? updateTransaction() : null
          updateRoom ? updateRoom() : null
          onClose()
     }
     

     const handleClose = () => {
          onClose()
          setEmptyField(false)
     }

     return (
          <>
               <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
               >
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>{title}</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody pb={6}>
                              {updateTransaction ?
                                   <>
                                        <FormControl>
                                             <FormLabel>Order Name</FormLabel>
                                             <Input ref={initialRef} placeholder='John Doe' name='order_name' onChange={handleChange('order_name')} onKeyDown={handleChange()} />
                                        </FormControl>

                                        <FormControl mt={4}>
                                             <FormLabel>Order E-mail</FormLabel>
                                             <Input placeholder='johndoe@example.com' name='order_email' onChange={handleChange('order_email')} onKeyDown={handleChange()} />
                                        </FormControl>

                                        <FormControl mt={4} mb={6}>
                                             <FormLabel>Guest Name</FormLabel>
                                             <Input placeholder='John, Doe, Ted, Bro' name='guest_name' onChange={handleChange('guest_name')} onKeyDown={handleChange()} />
                                        </FormControl>
                                   </>
                                   :
                                   <>
                                        <FormControl>
                                             <FormLabel>Room Number</FormLabel>
                                             <Input ref={initialRef} placeholder='121' name='room_number' onChange={handleChange('room_number')} onKeyDown={handleChange()} />
                                        </FormControl>

                                        <FormControl mt={4} mb={6}>
                                             <FormLabel>Room Type</FormLabel>
                                             <Select onChange={handleChange('room_type')} >
                                                  <option value={""}>--Select Room Type--</option>
                                                  {roomType.map((option, index) => {
                                                       return (
                                                            <option key={index} value={option.id}>
                                                                 {option.room_type_name}
                                                            </option>
                                                       );
                                                  })}
                                             </Select>
                                        </FormControl>
                                   </>
                              }
                              {emptyField ?
                                   <AlertStatus errMessage={'Please fill all required fields!'} />
                                   : null
                              }
                         </ModalBody>
                         <ModalFooter>
                              <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
                                   Save
                              </Button>
                              <Button onClick={handleClose}>Cancel</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}
export default AlertModalForm