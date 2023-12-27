import React, { useEffect, useState } from 'react'
import { fetchProblemsApi } from '../../api/api';
import CustomPieChart from './CustomPieChart';
import CustomTable from './CustomTable';

const Achievement = () => {
  const [chartData, setChartData] = useState<{
    percentage: number; label: string; value: number;
  }[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const generateChartData = async () => {
      const response = await fetchProblemsApi();

      const solvedProblems = response.filter((problem: { solved: any; }) => problem.solved);

      // 문제 데이터에서 태그를 기준으로 그룹핑합니다.
      const tagGroup = solvedProblems.reduce((acc: { [x: string]: any[]; }, problem: { tag: string | number; }) => {
        if (!acc[problem.tag]) {
          acc[problem.tag] = [];
        }
        acc[problem.tag].push(problem);
        return acc;
      }, {});

      // 태그별로 문제 통계를 생성합니다.
      const tags = Object.keys(tagGroup);
      const values = tags.map(tag => tagGroup[tag].length);
      const total = values.reduce((acc, val) => acc + val, 0);
      setTotalValue(total);

      // 통계 데이터를 생성합니다.
      const data = tags.map((tag, index) => ({
        label: tag,
        value: values[index],
        percentage: Math.round((values[index] / total) * 100),
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
            {totalValue === 0 ? <p className='text-center text-2xl font-bold w-chart h-chart'>푼 문제가 없습니다.</p> : <CustomPieChart chartData={chartData} />}
          </div>
          {totalValue > 0 ? <CustomTable chartData={chartData} totalValue={totalValue} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Achievement
