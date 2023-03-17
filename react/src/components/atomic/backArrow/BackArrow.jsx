import { IoIosArrowBack } from 'react-icons/io';
import { IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      icon={<IoIosArrowBack />}
      aria-label="Go back"
      onClick={() => handleClick()}
      alignItems='center'
      size={"md"}
    />
  );
};

export default BackButton
