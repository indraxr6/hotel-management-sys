import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import moment from 'moment';

const LiveClock = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Text fontSize="1xl">
      {time.format('hh : mm A')} | {time.format('D MMM YYYY')}
    </Text>
  );
};

export default LiveClock;
