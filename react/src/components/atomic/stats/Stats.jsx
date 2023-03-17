import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsDoorOpen } from 'react-icons/bs';
import { BiDollar } from 'react-icons/bi';
import { FaFileInvoice } from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Stats() {
  const [revenue, setRevenue] = useState(null)
  const [roomCount, setRoomCount] = useState(null)
  const [orderCount, setOrderCount] = useState(null)
  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    async function getStats() {
      try {
        const statsReq = await fetch(`${apiURL}/get-stats`)
        const statsRes = await statsReq.json()
        setRevenue(statsRes.revenue)
        setOrderCount(statsRes.transactionCount)
        setRoomCount(statsRes.roomRemaining)
      } catch (err) {
        console.log(err)
      }
    }
    getStats()
  }, []);

  const month = new Date()
  return (
    <Box maxW="7xl" mx={'auto'} pt={4} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} textAlign={'left'}>
        <StatsCard
          title={`Revenue (${month.toLocaleString('default', { month: 'long' })})`}
          stat={revenue ? "$" + revenue : "$0"}
          icon={<BiDollar size={'3em'} />}
        />
        <StatsCard
          title={'Orders this Month'}
          stat={orderCount ? orderCount : "0"}
          icon={<FaFileInvoice size={'3em'} />}
        />
        <StatsCard
          title={'Available Room Now'}
          stat={roomCount ? roomCount : "0"}
          icon={<BsDoorOpen size={'3em'} />}
        />
      </SimpleGrid>
      <br />
    </Box>
  );
}