import React from 'react';
import { VictoryPie } from 'victory';
import { Box } from '@chakra-ui/react';

const data = [
  { x: 'A', y: 50 },
  { x: 'B', y: 75 },
  { x: 'C', y: 25 },
];

const blueColors = ['#90cdf4', '#3182ce', '#2c5282'];

const BlueVictoryPie = () => {
  return (
    <Box w="300px">
      <VictoryPie
        data={data}
        colorScale={blueColors}
        innerRadius={50}
        style={{ labels: { fontSize: 12, fill: 'white' } }}
      />
    </Box>
  );
};

export default BlueVictoryPie;