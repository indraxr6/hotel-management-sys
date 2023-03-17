import { Tag } from '@chakra-ui/react';

const OrderStatusTag = ({ orderStatus }) => {
  switch (orderStatus) {
    case 'NEW':
      return <Tag colorScheme='green' borderRadius='full' variant='subtle' fontWeight={'600'}>NEW</Tag>;
    case 'CHECK-IN':
      return <Tag colorScheme='yellow' borderRadius='full' variant='subtle' fontWeight={'600'}>CHECK-IN</Tag>;
    case 'CHECK-OUT':
      return <Tag colorScheme='blue' borderRadius='full' variant='subtle' fontWeight={'600'}>CHECK-OUT</Tag>;
    case 'CANCEL':
      return <Tag colorScheme='red' borderRadius='full' variant='subtle' fontWeight={'600'}>CANCELLED</Tag>;
    default:
      return <Tag>{orderStatus}</Tag>;
  }
};

export default OrderStatusTag;
