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

function AlertModal({ isOpen, onClose, handleStatusChange, handleStatusCancel, handleOpenAlertCancel }) {
     const handleClickChange = () => {
          if (handleStatusChange) {
               handleStatusChange();
          }
          onClose();
     };
     const handleClickCancel = () => {
          if (handleStatusCancel) {
               handleStatusCancel();
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
                         <ModalHeader>Confirmation</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody>
                              Are you sure you want to change the status of this order?
                         </ModalBody>
                         <ModalFooter>
                              <Button colorScheme='blue' mr={3} onClick={handleClickChange}>
                                   Confirm
                              </Button>
                              <Button variant='ghost' onClick={handleClose}>Abort</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}
export default AlertModal
