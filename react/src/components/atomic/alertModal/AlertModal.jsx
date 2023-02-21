import {
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalFooter,
     ModalBody,
     ModalCloseButton,
     useDisclosure,
     Button,

} from '@chakra-ui/react'

function AlertModal({ isOpen, onClose, handleStatusChange, handleStatusCancel }) {
     const handleCloseWithStatusChange = () => {
          handleStatusChange();
          handleStatusCancel()
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
                         <ModalHeader>Confirmation</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody>
                              Are you sure you want to change the status of this order?
                         </ModalBody>
                         <ModalFooter>
                              <Button colorScheme='blue' mr={3} onClick={handleCloseWithStatusChange}>
                                   Confirm
                              </Button>
                              <Button variant='ghost' onClick={onClose}>Cancel</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}
export default AlertModal

