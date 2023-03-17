import { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Tag,
  TagLabel,
  Tooltip,
  Button,
  ButtonGroup,
  Center,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { useRef } from 'react';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [photo, setPhoto] = useState(localStorage.getItem('photo'));
  const [username, setUsername] = useState(localStorage.getItem('name'));
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');
  const [message, setMessage] = useState("")
  const [hovered, setHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const [editPasswordMode, setEditPasswordMode] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [usernameUpdate, setUsernameUpdate] = useState("")

  const inputRef = useRef()

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleUploadClick = () => {
    document.getElementById('photoUpload').click();

  };

  const handleEditName = () => {
    setIsEditing(true)
  }

  const abortEditMode = () => {
    setOldPassword("")
    setNewPassword("")
    setEditPasswordMode(false)
    setMessage("")
  }

  const changeProfilePhoto = async () => {
    try {
      const formData = new FormData()
      formData.append('photo', selectedFile)
      const update = await fetch(`${apiURL}/user/editPhoto/${id}`, {
        method: "PUT",
        body: formData
      })
      const responseData = await update.json()
      localStorage.removeItem('photo')
      if (update.ok) {
        setPhoto(responseData.newPhoto);
        localStorage.setItem('photo', responseData.newPhoto)
        window.location.reload()
      }
      console.log(responseData);
    } catch (err) {
      console.log(err)
    }
  }

  const saveChange = () => {
    if (selectedFile && usernameUpdate ) {
      changeProfilePhoto();
      changeUsername();
    }
    if (selectedFile && !usernameUpdate) {
      changeProfilePhoto();
    }
    if (usernameUpdate && !selectedFile) {
      changeUsername();
    }
    if (!selectedFile || !usernameUpdate) {
      onClose();
    }
  }

  const reqPassword = {
    oldPassword: oldPassword,
    newPassword: newPassword
  }

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage("Please fill in all the fields!")
      return
    }
    try {
      const updatePassword = await fetch(`${apiURL}/user/changepassword/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(reqPassword)
      })
      const responseData = await updatePassword.json()
      console.log(responseData);
      if (responseData) {
        setMessage(responseData.message)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const changeUsername = async () => {
    try {
      const updateUsername = await fetch(`${apiURL}/user/editname/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          "name" : usernameUpdate
        })
      })
      const responseData = await updateUsername.json()
      localStorage.removeItem('name')

      console.log(responseData);
      if (updateUsername.ok) {
        setUsername(responseData.new_name)
        localStorage.setItem('name', responseData.new_name)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }


  const apiURL = import.meta.env.VITE_API_URL

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
            {selectedFile ? (
              <Tooltip hasArrow label="Change profile photo">
                <Avatar
                  size="xl"
                  name={username}
                  src={URL.createObjectURL(selectedFile)}
                  onMouseEnter={() => setHovered(true)}
                  // onMouseLeave={() => setHovered(false)}
                  onClick={handleUploadClick}
                />
              </Tooltip>
            ) : (
              <Tooltip hasArrow label="Change profile photo">
                <Avatar
                  size="xl"
                  name={username}
                  src={`${apiURL}/images/profile/${photo}`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={handleUploadClick}
                />
              </Tooltip>
            )}
          </Box>
          {hovered && (
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              ref={inputRef}
            />

          )}
          {isEditing ? (
            <Editable defaultValue={username} textAlign={'center'}>
              <Tooltip hasArrow label={'Change Name'}>
                <EditablePreview fontSize={'24px'} fontWeight={'200'} mb={3} />
              </Tooltip>
              <EditableInput onChange={(e) => setUsernameUpdate(e.target.value)} />
            </Editable>

          ) : (
            <Box textAlign={'center'}>
              <Text fontSize={'24px'} fontWeight={'200'} mb={3} onClick={handleEditName}>
                <Tooltip hasArrow label={'Change Name'}>
                  {username}
                </Tooltip>
              </Text>
            </Box>
          )}
          <Center>
            <Tag
              size={'sm'}
              borderRadius='full'
              variant='outline'
              colorScheme={role === 'ADMIN' ? 'red' : 'yellow'}
              mb={4}
              mt={isEditing ? "1" : "0"}
            >
              <TagLabel>{role}</TagLabel>
            </Tag>
          </Center>

          {editPasswordMode ?
            <>
              <FormControl id="oldPassword" mb={4}>
                <FormLabel>Old Password</FormLabel>
                <Input type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='New Password' />
              </FormControl>
              <FormControl id="email" mb={3}>
                <FormLabel>New Password</FormLabel>
                <Input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' />
              </FormControl>
              <Text color="crimson" fontSize="sm" fontWeight="regular" textAlign="left">{message ? message : null}</Text>
            </>
            :
            <>
              <FormControl id="email" mb={4}>
                <FormLabel>E-mail</FormLabel>
                <Input type="text" value={email}
                />
              </FormControl>
              <FormControl id="email" isReadOnly mb={3}>
                <FormLabel>User ID</FormLabel>
                <Input type="text" value={id} />
              </FormControl>
            </>
          }
        </ModalBody>
        <ModalFooter mb={4}>
          <ButtonGroup>
            {!editPasswordMode ?
              <>
                <Button colorScheme={'red'} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme={'blue'} onClick={() => setEditPasswordMode(true)}>
                  Change Password
                </Button>
                <Button colorScheme={'green'} onClick={saveChange}>
                  Save
                </Button>
              </>
              :
              <>
                <Button colorScheme={'blue'} onClick={() => abortEditMode()}>
                  Back
                </Button>
                <Button colorScheme={'green'} onClick={changePassword}>
                  Save
                </Button>
              </>
            }

          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
