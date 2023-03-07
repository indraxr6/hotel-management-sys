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

function AlertModal({ isOpen, onClose, handleCloseAlertCancel, handleCloseAlert, handleStatusChange, handleStatusCancel, title, message }) {
     // const handleClickChange = () => {
     //      if (handleStatusChange) {
     //           handleStatusChange();
     //      }
     //      onClose();
     // };
     // const handleClickCancel = () => {
     //      if (handleStatusCancel) {
     //           handleStatusCancel();
     //      }
     //      onClose();
     // };

     const handleClick = () => {
          if (handleStatusChange) {
               handleStatusChange();
          }
          if (handleStatusCancel) {
               handleStatusCancel();
          }
          onClose();
     };

     const handleClose = () => {
          if (handleCloseAlert) {
               handleCloseAlert();
               handleCloseAlertCancel();
          }
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
                              <Button colorScheme='blue' mr={3} onClick={handleClick}>
                                   Confirm
                              </Button>
                              <Button variant='ghost' onClick={handleClose}>
                                   Abort
                              </Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}
export default AlertModal
