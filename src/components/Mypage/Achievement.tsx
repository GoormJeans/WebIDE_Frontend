import React, { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const Achievement = () => {
  const [chartData, setChartData] = useState<{
    percentage: number; label: string; value: number;
  }[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    // Generate random data for the chart
    const generateChartData = () => {
      const languages = ['Java', 'Python3', 'C++'];
      const values = languages.map(() => Math.floor(Math.random() * 100));
      const sum = values.reduce((acc, val) => acc + val, 0);
      const normalizedValues = values.map((val) => Math.round((val / sum) * 100));
      const total = values.reduce((acc, val) => acc + val, 0);
      setTotalValue(total);
      const data = languages.map((language, index) => ({
        label: language,
        value: values[index],
        percentage: normalizedValues[index],
      }));

      setChartData(data);
    };

    generateChartData();
  }, []);

  return (
    <div className='circle-chart bg-white p-3 rounded-2xl shadow-xl hidden md:block lg:block xl:block'>
      <div className='chart-background '>
        <p className=' text-sm font-medium '>Your achievement</p>
        <div className=' flex flex-row'>
          <div className='bg-white'>
            <PieChart
              colors={['#14B8A6', '#3B82F6', '#EC4899', '#6366F1', '#F59E0B',]}
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
          </div>
          <TableContainer className='bg-white hidden lg:block xl:block' sx={{ marginTop: 1, marginBottom: 1 }}>
            <Table sx={{ backgroundColor: "white" }}>
              <TableHead sx={{ backgroundColor: "white" }}>
                <TableRow sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
                  <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>Language</TableCell>
                  <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>Value</TableCell>
                  <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((item, index) => (
                  <TableRow key={index} >
                    <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', }}>{item.label}</TableCell>
                    <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold' }}>{item.value}</TableCell>
                    <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold' }}>{`${item.percentage}%`}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none' }}>Total</TableCell>
                  <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold' }}>{totalValue}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default Achievement
