import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

interface ChartDataItem {
  percentage: number;
  label: string;
  value: number;
}

interface CustomPieChartProps {
  chartData: ChartDataItem[];
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({ chartData }) => {
  return (
    <PieChart
      colors={['#14B8A6', '#3B82F6', '#EC4899', '#6366F1', '#F59E0B']}
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          highlightScope: { faded: 'global', highlighted: 'item' },
          highlighted: { additionalRadius: 2 },
          data: chartData,
          innerRadius: 70,
          outerRadius: 100,
          paddingAngle: 3,
          cornerRadius: 5,
        },
      ]}
      sx={{
        backgroundColor: 'white',
        [`& .${pieArcLabelClasses.root}`]: {
          fontSize: '0.7rem',
          fontWeight: 'bold',
          fontFamily: 'K2D',
        },
      }}
      width={360}
      height={200}
    />
  );
};

export default CustomPieChart;
