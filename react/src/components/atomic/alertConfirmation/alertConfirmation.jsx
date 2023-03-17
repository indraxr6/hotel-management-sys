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

function AlertConfirmation({ isOpen, onClose, title, message, type, addTransaction, deleteTransaction, deleteRoomType, deleteRoom, addRoomType, editRoomType, addRoom, makeAsAdmin, deleteUser }) {
     const handleConfirm = () => {
          addTransaction ? addTransaction() : null;
          deleteTransaction ? deleteTransaction() : null;
          deleteRoomType ? deleteRoomType() : null;
          deleteRoom ? deleteRoom() : null;
          editRoomType ? editRoomType() : null;
          addRoomType ? addRoomType() : null;
          addRoom ? addRoom() : null;
          makeAsAdmin ? makeAsAdmin() : null;
          deleteUser ? deleteUser() : null;
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
                              <Button colorScheme={type === 'delete' ? 'red' : 'blue'} mr={3} onClick={handleConfirm}>
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
