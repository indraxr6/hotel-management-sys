import { Tag } from '@chakra-ui/react';

const RoleBadge = ({ role }) => {
     switch (role) {
          case 'Default':
               return <Tag alignContent={'center'} borderRadius='full' variant='subtle' fontWeight={'600'}>Default</Tag>;
          case 'CUSTOMER':
               return <Tag colorScheme='blue' borderRadius='full' variant='subtle' fontWeight={'600'}>CUSTOMER</Tag>;
          case 'RECEPTIONIST':
               return <Tag colorScheme='green' borderRadius='full' variant='subtle' fontWeight={'600'}>RECEPTIONIST</Tag>;
          case 'ADMIN':
               return <Tag colorScheme='yellow' borderRadius='full' variant='subtle' fontWeight={'600'}>ADMIN</Tag>;
          case 'SUPERADMIN':
               return <Tag colorScheme='red' borderRadius='full' variant='subtle' fontWeight={'600'}>SUPER ADMIN</Tag>;
          case 'YOU':
               return <Tag colorScheme='teal' borderRadius='full' variant='subtle' fontWeight={'600'}>YOURSELF</Tag>;
          default:
               return <Tag>UNKNOWN</Tag>;
     }
};

export default RoleBadge