import {
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalFooter,
     ModalBody,
     ModalCloseButton,
     Button,

} from '@chakra-ui/react'

function AlertConfirmation({ isOpen, onClose, title, message, addTransaction, deleteTransaction, addUser, addRoom }) {
     const handleConfirm = () => {
          if (addTransaction) {
               addTransaction();
          }
          onClose();

          if (deleteTransaction) {
               deleteTransaction();
          }
          onClose();
     };

     const handleClose = () => {
          onClose();
     };
     return (
          <>
               <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset='slideInBottom'
               >
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>{title}</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody>
                              {message}
                         </ModalBody>
                         <ModalFooter>
                              <Button colorScheme={deleteTransaction ? 'red' : 'blue'} mr={3} onClick={handleConfirm}>
                                   Confirm
                              </Button>
                              <Button variant='ghost' onClick={handleClose}>Abort</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}
export default AlertConfirmation
