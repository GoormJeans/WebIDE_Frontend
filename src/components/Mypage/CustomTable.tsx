import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface ChartDataItem {
  percentage: number;
  label: string;
  value: number;
}

interface CustomTableProps {
  chartData: ChartDataItem[];
  totalValue: number;
}

const CustomTable: React.FC<CustomTableProps> = ({ chartData, totalValue }) => {
  return (
    <TableContainer className='bg-white hidden lg:block xl:block' sx={{ marginTop: 1, marginBottom: 1 }}>
      <Table sx={{ backgroundColor: "white" }}>
        <TableHead sx={{ backgroundColor: "white" }}>
          <TableRow sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
            <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>Category</TableCell>
            <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>Value</TableCell>
            <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold', color: "grey.500" }}>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none' }}>{item.label}</TableCell>
              <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold' }}>{item.value}</TableCell>
              <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none', fontWeight: 'bold' }}>{`${item.percentage}%`}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ padding: '8px', backgroundColor: "white", border: 'none' }}>Total</TableCell>
            <TableCell sx={{ padding: '8px', backgroundColor: 'white', border: 'none', fontWeight: 'bold' }}>{totalValue}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
