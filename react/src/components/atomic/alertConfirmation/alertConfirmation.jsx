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

function AlertConfirmation({ isOpen, onClose, title, message, addTransaction, addUser, addRoom }) {
     // const handleTransaction = () => {
     //      if (handleStatusChange) {
     //           handleStatusChange();
     //      }
     //      onClose();
     // };
     // const handleAddUser = () => {
     //      if (handleStatusCancel) {
     //           handleStatusCancel();
     //      }
     //      onClose();
     // };

     const handleConfirm = () => {
          if (addTransaction) {
               addTransaction();
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
                              <Button colorScheme='blue' mr={3} onClick={handleConfirm}>
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
